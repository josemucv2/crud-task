/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Creates a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: My new task
 *               description:
 *                 type: string
 *                 example: A description of my task
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Task data error
 */

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Deletes a task by its ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task to delete
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Updates a task by its ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: New title
 *               description:
 *                 type: string
 *                 example: New description
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 */

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Retrieves a task by its ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *       404:
 *         description: Task not found
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retrieves all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Task list retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 64b5fc293ce9c02ff848f99a
 *                   title:
 *                     type: string
 *                     example: "Complete the monthly report"
 *                   description:
 *                     type: string
 *                     example: "The report must include all financial data for June"
 *                   completed:
 *                     type: boolean
 *                     example: false
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-12-28T10:30:00Z"
 */
