import express from 'express';
import { insertTalent, getTalentByHeroName } from '../controller/talent.js';

const talentRouter = express.Router();

talentRouter.get('/gettalent/:heroName', getTalentByHeroName);
talentRouter.post('/insert', insertTalent);

export default talentRouter;