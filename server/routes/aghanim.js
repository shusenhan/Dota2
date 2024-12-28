import express from "express";
import { getAghanimByHeroName, insertAghanim } from '../controller/aghanim.js';

const aghanimRouter = express.Router();

/**
 * @swagger
 * /aghanim/getaghanim/{heroName}:
 *   get:
 *     summary: 通过英雄名来获取英雄对应的阿哈利姆效果
 *     description: 获取英雄对应的阿哈利姆魔晶和阿哈利姆神杖效果
 *     parameters:
 *       - in: path
 *         name: heroName
 *         required: true
 *         description: 英雄的英文名称
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 获取一个关于英雄阿哈利姆效果的对象.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 AghanimId:
 *                   type: number
 *                   description: 数据库中的主键
 *                 EffectOwner:
 *                   type: string
 *                 AffectSkill1:
 *                   type: string
 *                 Description1:
 *                   type: string
 */
aghanimRouter.get("/getaghanim/:heroName", getAghanimByHeroName);

aghanimRouter.post("/insert", insertAghanim);

export default aghanimRouter;