import mongoose, { Schema } from 'mongoose'

const partySchema = new Schema({
  list: {
    type: String
  },
  count: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

partySchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      list: this.list,
      count: this.count,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Party', partySchema)

export const schema = model.schema
export default model
