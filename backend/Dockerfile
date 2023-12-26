# Use the official Python image
FROM python:3-alpine3.19

# Set the working directory
WORKDIR /app

# Copy the backend files to the container
COPY . .

# Install dependencies
RUN pip install -r requirements.txt

# Run the application
CMD ["python","run.py"]
