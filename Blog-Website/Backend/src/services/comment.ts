import IComment from '../interfaces/IComment'
import Comment from '../model/comment'

export const getComments = async () =>
{
    const commentInfo = await Comment.findAll()
    return commentInfo 
}

export const getCommentByBlogId = async(blog_id: string) =>
{
     const commentInfo = await Comment.findAll({ where: { blog_id } })
     return commentInfo
}

export const createComment = async(body: IComment, blog_id: string, user_id: string) =>
{
    const commentInfo = await Comment.create({ ...body, blog_id, user_id })
    return commentInfo
}


export const updateComment =  async(body: IComment, comment_id: string) =>
{
    const updatedComment = await Comment.update({ ...body }, { where: { comment_id } })
    return updatedComment
}

export const deleteComment = async (comment_id: string) =>
{
    const doesCommentExist =  await Comment.findByPk(comment_id) 
        
        if(!doesCommentExist)
        {
            return doesCommentExist
        }

    return await Comment.destroy({ where: { comment_id } });
}