# suin/nodejs-playground

My research related to Node.js.

## Worker Threads

* [How can I use `worker_threads` module?](./worker-threads/01-simple)
* [How can I pass data to threads when threads spawn?](./worker-threads/02-pass-data-to-worker-on-spwaning)
* [Can I share data with `workerData` between the main thread and the child threads?](./worker-threads/03-pass-object-to-worker-on-spwaning) - No.
* [How can I spawn multiple workers?](./worker-threads/04-spawn-multiple-workers)
* Comparison of single-thread and multi-thread
    * [Single-thread code](./worker-threads/05-cpu-intesive-job-without-worker)
    * [Multi-thread code](./worker-threads/06-cpu-intesive-job-with-worker)

All the research result was reported in my blog post: [Node.js: CPU負荷で3秒かかっていた処理を「Worker Threads」で1秒に時短する - Qiita](https://qiita.com/suin/items/bce351c812603d413841).
