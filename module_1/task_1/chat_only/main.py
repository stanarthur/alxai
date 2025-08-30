from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

# Initialize FastAPI app
app = FastAPI(
    title="Items API",
    description="A simple API to manage items",
    version="1.0.0"
)

# Define Pydantic model for Item
class Item(BaseModel):
    id: Optional[int] = None
    name: str
    description: Optional[str] = None
    price: float
    tax: Optional[float] = None

# In-memory database
items_db = []
item_id_counter = 1

# GET endpoint to retrieve all items
@app.get("/items", response_model=List[Item], summary="Get all items")
async def get_items():
    """Retrieve all items from the database."""
    return items_db

# POST endpoint to create a new item
@app.post("/items", response_model=Item, status_code=201, summary="Create a new item")
async def create_item(item: Item):
    """Create a new item in the database."""
    global item_id_counter
    
    # Assign an ID if not provided
    if item.id is None:
        item.id = item_id_counter
        item_id_counter += 1
    else:
        # Check if ID already exists
        for existing_item in items_db:
            if existing_item.id == item.id:
                raise HTTPException(status_code=400, detail="Item ID already exists")
    
    # Add item to database
    items_db.append(item)
    return item

# Run the application with uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)