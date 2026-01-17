import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleAnalyze } from "./routes/analyze";

// Simple in-memory file store for multipart uploads
type FileBuffer = {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
  size: number;
};

// Custom simple file upload middleware
function simpleFileUpload() {
  return express.raw({ type: "application/octet-stream", limit: "10mb" });
}

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Custom multipart form-data parser
  app.use(
    express.raw({
      type: "application/octet-stream",
      limit: "10mb",
    })
  );

  // Custom middleware to handle multipart/form-data
  app.use((req, res, next) => {
    const contentType = req.headers["content-type"] || "";

    if (contentType.includes("multipart/form-data")) {
      // Parse multipart form data
      let body = "";
      let fileBuffer: Buffer | null = null;
      let fileName = "";
      let fileSize = 0;

      req.on("data", (chunk: Buffer) => {
        body += chunk.toString("binary");
      });

      req.on("end", () => {
        try {
          // Simple multipart parser
          const boundaryMatch = contentType.match(/boundary=([^;]+)/);
          if (!boundaryMatch) {
            return next();
          }

          const boundary = "--" + boundaryMatch[1];
          const parts = body.split(boundary);

          for (const part of parts) {
            if (
              part.includes('Content-Disposition: form-data; name="image"')
            ) {
              // Extract file data
              const headerEnd = part.indexOf("\r\n\r\n");
              if (headerEnd !== -1) {
                const headers = part.substring(0, headerEnd);
                const fileNameMatch = headers.match(/filename="([^"]+)"/);
                if (fileNameMatch) {
                  fileName = fileNameMatch[1];
                }

                const dataStart = headerEnd + 4;
                const dataEnd = part.lastIndexOf("\r\n");
                fileBuffer = Buffer.from(
                  part.substring(dataStart, dataEnd),
                  "binary"
                );
                fileSize = fileBuffer.length;
              }
            }
          }

          // Attach file to request
          if (fileBuffer) {
            (req as any).file = {
              buffer: fileBuffer,
              mimetype: "image/jpeg",
              originalname: fileName || "upload.jpg",
              size: fileSize,
            };
          }
        } catch (e) {
          console.error("Multipart parse error:", e);
        }

        next();
      });
    } else {
      next();
    }
  });

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  app.post("/api/analyze", handleAnalyze);

  return app;
}
