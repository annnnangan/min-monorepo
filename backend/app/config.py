from typing import List, Optional

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    ENV: str = "development"
    PORT: int = 8000
    CORS_ORIGINS: List[str] = ["http://localhost:5173"]
    CORS_ORIGIN_REGEX: Optional[str] = None


settings = Settings()

