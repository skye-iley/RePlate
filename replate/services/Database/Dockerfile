# this is the basic python version we are using
FROM python:3.13.3-alpine

# Sets the working directory to "app"
WORKDIR /app

# Copies the application code
COPY . .

# uses pip to install the required python modules
RUN pip install fastAPI

RUN pip install pydantic

RUN pip install asyncio

RUN pip install sqlite3

RUN pip install asynccontextmanager

# runs the application using uvicorn on port 3000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "3000"]

