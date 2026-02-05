from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Using the provided details: user=admin, password=admin, host=172.30.144.1, port=5432, db=postgres
# Note: 'postgres' is the default DB. If another was intended, change here.
SQLALCHEMY_DATABASE_URL = "postgresql://admin:admin@172.30.144.1:5432/postgres"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
