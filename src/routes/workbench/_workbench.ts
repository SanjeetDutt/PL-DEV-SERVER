import express from 'express';
import { checkOrCreateFile } from '../../util/CommonFunctions';

import caseRouter from "./case"
export const WORKBENCH_CONSTANT = {
	CASE_FILE: './cases.json'
};


const router = express.Router();

checkOrCreateFile(WORKBENCH_CONSTANT.CASE_FILE);

router.use("/case", caseRouter)

export default router;
