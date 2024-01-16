import { Request, Response } from 'express'
import Task from "../models/task"
import { Sequelize, Op } from 'sequelize';

/**
 * @description gets all task from the database
 * 
 * @returns array of task
 */
export const getTasks = async (per_page: number, offset: number, search_term: string, completed: string) => {

    let doesTaskExist
    if (completed === "true" || completed === "false") {
        doesTaskExist = await Task.findAll
            ({
                where:
                {
                    [Op.and]:
                        [
                            {
                                [Op.or]:
                                    [
                                        { 'name': { [Op.iLike]: `%${search_term}%` } },
                                        { 'description': { [Op.iLike]: `%${search_term}%` } },

                                    ],
                            },
                            { completed }
                        ]
                }
                , offset
                , limit: per_page
            });
    }
    else {
        doesTaskExist = await Task.findAll({
            where:
            {
                [Op.or]:
                    [
                        { 'name': { [Op.iLike]: `%${search_term}%` } },
                        { 'description': { [Op.iLike]: `%${search_term}%` } },
                    ]
            }
            , offset
            , limit: per_page
        });
    }

    const totalCount = await Task.count({
        where:
        {
            [Op.or]:
                [
                    { 'name': { [Op.like]: '%' + search_term + '%' } },
                    { 'description': { [Op.like]: '%' + search_term + '%' } }
                ]
        }
    })
    const totalPage = Math.ceil(totalCount / per_page)

    let taskInfo
    if (doesTaskExist.length != 0) {
        taskInfo = doesTaskExist.map(task => {
            return task.get({ plain: true })
        })
        return { taskInfo, totalCount, totalPage }
    }
    else {
        return { taskInfo: "", totalCount, totalPage }
    }

}

/**
 * @description CREATES new task into the db
 * 
 * @param body
 *  
 * @returns object
 */
export const createTask = async (body: any) => {

    let data = { ...body }
    data = await Task.create(data)
    return data
}

/**
 * @description UPDATES the task
 * 
 * @param {Request} req
 * 
 * @returns object
 */
export const updateTask = async (req: Request) => {
    const [rowCount, [updatedTask]] = await Task.update(req.body, { where: { taskid: req.params.id }, returning: true });
    return { rowCount, updatedTask }

}

/**
 * @description DELETES the task from the database
 * 
 * @param {Request} req
 * 
 * @returns number
 */
export const deleteTask = async (req: Request) => {
    const deletedRowCount = await Task.destroy({ where: { taskid: req.params.id } });
    return deletedRowCount;

}