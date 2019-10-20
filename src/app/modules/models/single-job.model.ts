import { PostJob } from './post-job.model';
export interface SingleJob {
    id: string;
    uid: string;
    job: PostJob;
}