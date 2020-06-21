import { execSync } from 'child_process';

export const PROJECT_DIR  = __dirname


export function getResolution(){
    const resolution = execSync('../utils/get_resolution.sh').toString();
    const res = resolution.split('\n');
    return [res[0],res[1]];
 }