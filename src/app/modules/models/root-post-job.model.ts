import { PostJob } from './post-job.model';

export interface RootPostJob {
    uid: string;
    postJobs: PostJob[];
}