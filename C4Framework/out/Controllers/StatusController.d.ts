export default class StatusController {
    static Status(): {
        code: number;
        msg: string;
        data: {
            Status: "Unknown" | "Initializing" | "Ready" | "Starting" | "Running";
        };
    };
}
