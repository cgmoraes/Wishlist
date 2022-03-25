from pymongo import MongoClient
import uuid

uri = 'mongodb://root:example@mongo:27017/'

client = MongoClient(uri)
db = client['wishList']
col = db['products']
col.create_index('product_id', name='product_id')

class wishList:

  def findRandom():
    data = []
    for x in col.aggregate([{ "$sample": { "size": 1 } }]):
      x.pop('_id')
      data.append(x)
    return data[0]

  def insertProduct(data):
    data['product_id'] = str(uuid.uuid4())
    data['bought'] = 'False'
    data['image_id'] = 'default'
    col.insert_one(data)

  def findAll():
    data = []
    for x in col.find():
      x.pop('_id')
      data.append(x)
    return data
  
  def findProduct(id):
    return col.find_one({'product_id': id})

  def updateProduct(data):
    col.update_many({'product_id': data['product_id']}, {"$set": {"bought": data['bought']}})

  def deleteProduct(id):
    col.delete_one({'product_id': id})

  def updateImage(product_id):
    image_id = str(uuid.uuid4())
    col.update_many({'product_id': product_id}, {"$set": {"image_id": image_id}})
    return image_id

  def deleteImage(id):
    col.update_many({'product_id': id}, {"$set": {"image_id": 'default'}})