import C4MQ from "./C4MQ";
import { C4SubscriberOption, C4SubscribeOption } from "./C4MQTypes/C4MQTypes";
export default class C4Subscriber {
    private m_Queue;
    private m_DefaultPublisher;
    private m_SubscribeOptions;
    private m_Logger;
    private m_CBs;
    constructor();
    /**
     * 初始化
     * @param Conn C4MQ连接，MQ连接
     * @param option C4SubscriberOption
     * @param logger 日志对象
     */
    init(Conn: C4MQ, option: C4SubscriberOption, logger?: any): Promise<boolean>;
    /**
     * 添加订阅配置
     * @param option C4SubscribeOption
     */
    addSubscribe(option: C4SubscribeOption): boolean;
    /**
     * 开始订阅
     */
    subscribe(): Promise<void>;
    /**
     * 消息处理方法
     */
    __processMsg(): Promise<void>;
    /**
     * 添加消息处理方法
     * @param handlers 方法对象或者加载路径
     */
    addMQHandler(handlers: Array<any>): Promise<any>;
    addMQHandler(handlerPaths: string[]): Promise<any>;
    /**
     * 是否初始化
     */
    isInit(): boolean;
    /**
     * 获取Queue的名字
     */
    getName(): string;
}
