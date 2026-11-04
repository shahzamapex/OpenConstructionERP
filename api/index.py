import os
import sys
from pathlib import Path
from fastapi import FastAPI
from fastapi.responses import JSONResponse

# Top-level assignment detected by @vercel/python AST parser
app = FastAPI(title="OpenConstructionERP")

# Add backend directory to sys.path so app.* imports resolve
backend_path = Path(__file__).resolve().parent.parent / "backend"
if str(backend_path) not in sys.path:
    sys.path.insert(0, str(backend_path))

db_url = os.environ.get("DATABASE_URL", "")

if db_url and db_url.startswith("postgresql"):
    from app.main import create_app
    app = create_app()
else:
    @app.api_route("/{full_path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"])
    async def config_required(full_path: str = ""):
        return JSONResponse(
            status_code=503,
            content={
                "status": "configuration_required",
                "service": "OpenConstructionERP Backend",
                "message": (
                    "OpenConstructionERP on Vercel requires an external PostgreSQL database "
                    "(e.g., Neon, Supabase, or AWS RDS). Please configure DATABASE_URL in your "
                    "Vercel Project Settings -> Environment Variables."
                ),
                "required_variable": "DATABASE_URL",
                "example_format": "postgresql+asyncpg://username:password@ep-sample-123.us-east-1.aws.neon.tech/neondb?sslmode=require"
            }
        )
