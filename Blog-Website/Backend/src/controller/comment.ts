import { Request, Response, NextFunction } from "express";
import Comment from "../model/comment";
import AuthenticatedRequest from "../interfaces/AuthenticatedRequest";

import * as commentService from '../services/comment'

export const getComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const commentInfo = await commentService.getComments()
        if (commentInfo.length === 0) {
            return res.status(404).json({ success: false, message: "Comment not found" })
        }

        res.status(200).json({ success: true, data: commentInfo })
    }
    catch (error) {
        next(error)
    }
}

export const getCommentByBlogId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const commentInfo = await Comment.findAll({ where: { blog_id: req.params.id } })
        if (commentInfo.length === 0) {
            return res.status(404).json({ success: false, message: "Comments not found" })
        }

        res.status(200).json({ success: true, data: commentInfo })
    }
    catch (error) {
        next(error)
    }
}

export const createComment = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const user_id = req.user?.user_id
        let commentInfo = await commentService.createComment(req.body, req.params.id, user_id)
        commentInfo = commentInfo.toJSON()
        res.status(201).json({ success: true, data: commentInfo })
    }
    catch (error) {
        next(error)
    }
}

export const updateComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment_id = req.params.id
        const updatedComment = await commentService.updateComment(req.body, comment_id)

        if (!updatedComment) {
            return res.status(404).json({ success: false, message: "Comment not found" })
        }

        res.status(200).json({ success: true, data: updatedComment })
    }
    catch (error) {
        next(error)
    }
}

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment_id = req.params.id
        const commentDeleted = await commentService.deleteComment(comment_id)

        if (!commentDeleted) {
            return res.status(404).json({ success: false, message: "Comment not found" })
        }

        res.status(204).end()
    }
    catch (error) {
        next(error)
    }
}