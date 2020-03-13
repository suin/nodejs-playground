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

* [What will happen if an error occurs in the worker?](./worker-threads/07-error-thrown-in-worker)
* [Does the worker-side-error kill the main thread?](./worker-threads/08-error-thrown-in-worker) - Yes.
* [How can I handle the worker-side-error in the main thread?](./worker-threads/09-main-thread-side-error-handing)

The above research result has been explained on my blog post: [Node.jsのWorker Threadsは、Workerが例外を投げるとメインスレッドも落ちるので注意 - Qiita](https://qiita.com/suin/items/62e505d9b0d21b0a7911).

* [How to pass data from a main thread to a worker.](./worker-threads/10-how-to-send-data-to-worker-from-main-thread)
* [How to pass data from a worker to a main thread.](./worker-threads/11-how-to-send-data-to-main-thread-from-worker)
* [How to pass data from a worker to another worker.](./worker-threads/12-how-to-send-data-to-worker-from-worker)
* [How to pass data across workers via `MessageChannel`.](./worker-threads/13-worker-to-worker-communication-with-MessagePort)

The above research result has been explained on my blog post: [Node.js Worker Threads: スレッド間でデータを送受信する方法 - Qiita](https://qiita.com/suin/items/8fb7f77dd0a994b6f524)

* [Benchmark of message passing const: child_process vs worker_threads.](./worker-threads/14-message-passing-cost)
