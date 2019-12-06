import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TodoSchema = new Schema({
  item: String
});
export const TodoModel = mongoose.model('Todo', TodoSchema);