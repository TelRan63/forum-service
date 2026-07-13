import Post from '../models/post.model.js';

export const createPost = async (postData) => {
    // const post = new Post(postData);
    // return post.save();
    return Post.create(postData);
}

export const findPostById = async (id) => Post.findById(id).exec();

export const deletePost = async (id) => Post.findByIdAndDelete(id).exec();

export const addLike = async (id) => Post.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { returnDocument: 'after' }).exec();

export const findPostsByAuthor = async (author) => Post.find({ author: new RegExp(`^${author}$`, 'i') }).exec();

export const addComment = async (id, comment) => Post.findByIdAndUpdate(id, { $push: { comments: comment } }, { returnDocument: 'after' }).exec();

export const findPostsByTags = async (tags) => {
    const tagsRegex = tags.map(tag => new RegExp(`^${tag}$`, 'i'));
    return Post.find({ tags: { $in: tagsRegex } }).exec();
}

export const findPostsByPeriod = async (dateFrom, dateTo) => Post.find({ dateCreated: { $gte: dateFrom, $lte: dateTo } }).exec();

export const updatePost = async (id, updatedData) => {
    const tags = updatedData.tags ?? [];
    delete updatedData.tags;
    const data = {...updatedData, $addToSet: {tags}}
    return Post.findByIdAndUpdate(id, data, { returnDocument: 'after' }).exec();
}