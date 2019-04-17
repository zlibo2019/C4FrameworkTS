<!-- # 通过C4MQ来创建连接
# 通过配置创建Publisher
# 通过配置来设置发送的消息的属性
# 通过配置创建Subscriber（死信）
# 通过配置来绑定Subscriber和Handler
# 支持消息的优先级和超时（x-message-ttl,x-max-priority,priority）
# 支持队列的最大长度（max-length和max-length-bytes）

# 定义超时队列
# 定义优先队列
# 定义超时消息
# 定义死信队列
# 定义定时任务 -->

<h1>C4MQ</h1>

<h2>模块介绍</h1>

C4MQ是基于amqp模块构建的MQ操作类（模块），并提供了更高级的封装形式：

* 提供Publisher和Subscriber定义，建立在Exchange和Queue的基础上；
* 提供注解方式定义消息处理方法；
* 支持Subscriber与Publisher之间的自由绑定；
* Subscriber支持对预读取的消息进行排队处理，确保处理方法的FIFO执行

<h2>使用</h2>

* 使用MQHandler注解对方法进行标记，提供消息处理方法；

  * 注解项包含：

  ```
    {
        PublisherName ?: string,        // Exchange或Publisher的名字
        RoutingKey ?: string,           // routingkey
        MsgType : string                // Message的类型
    }

  ```

* 使用MsgBody注解对消息体中属性进行标记，用于参数绑定；

  * 注解项包含：

  ```
  {
    value : string          // 需要绑定的属性名
  }
  ```

* 具体示例参考./src/MQHandlers/Hello.ts

<h3>类s</h3>

* C4MQ

  * 说明：用于连接MQ的类，对应RabbitMQ中Channel
  * 路径：./src/C4MQ.ts
  * 成员变量：

    * m_Channel，AMQPClient
    * m_Logger，日志对象

  * 成员方法：

    * init

    ```
    /**
     * 初始化，用于配置Channel和连接MQ
     * @param config ConnectionOptions
     * @param logger 日志对象
     */
    async init(config : ConnectionOptions, logger ?: any)
    ```
    <hr>

    * disconnect

    ```
    /**
     * 断开连接
     */
    async disconnect()
    ```

    <hr>

    * getChannel

    ```
    /**
     * 获取mq的Channel对象
     */
    getChannel()
    ```

    <hr>

    * isInit

    ```
    /**
     * 是否初始化
     */
    isInit()
    ```

  <hr>

* C4Exchange

  * 说明：对RabbitMQ的Exchange的封装
  * 路径：./src/C4Exchange.ts
  * 成员变量：

    * m_Channel，AMQPClient，连接
    * m_Exchange，AMQPExchange
    * m_Name，名字
    * m_Logger，日志对象

  * 成员方法：

    * declared

    ```
    /**
     * 声明Exchange
     * @param Conn C4MQ，MQ连接
     * @param name Exchange名
     * @param options ExchangeOptions，配置属性
     * @param logger 日志对象
     */
    async declared(Conn : C4MQ, name : string, options : ExchangeOptions, logger ?: any)
    ```

    <hr>

    * publish

    ```
    /**
     * 发布消息
     * @param routingKey routingKey
     * @param message message
     * @param options ExchangePublishOptions，配置项
     */
    async publish(routingKey : string, message : Buffer | {}, options : ExchangePublishOptions)
    ```

    <hr>

    * destroy

    ```
    /**
     * 销毁
     * @param ifUnused 是否在不再使用时销毁
     */
    destroy(ifUnused = true)
    ```

    <hr>

    * bindExchange

    ```
    /**
     * 绑定到另一个Exchange
     * @param srcExchangeName exchange的名字
     * @param routingKey routingkey
     */
    async bindExchange(srcExchangeName : string, routingKey : string)
    ```

    <hr>

    * unbindExchange

    ```
    /**
     * 解除绑定
     * @param srcExchangeName exchange名
     * @param routingKey routingKey
     */
    async unbindExchange(srcExchangeName : string, routingKey : string)
    ```

    <hr>

    * bindHeaders

    ```
    /**
     * 绑定Header
     * @param exchangeName exchange名
     * @param routingKey routingKey
     */
    async bindHeaders(exchangeName : string, routingKey : string)
    ```

    <hr>

    * getExchagneInstance

    ```
    /**
     * 获取Exchange的实例
     */
    getExchagneInstance()
    ```

    <hr>

    * isInit

    ```
    /**
     * 是否初始化
     */
    isInit()
    ```

    <hr>

    * getName

    ```
    /**
     * 获取Exchange名
     */
    getName()
    ```

  <hr>

* C4Queue

  * 说明：对应RabbitMQ的Queue
  * 路径：./src/C4Queue.ts
  * 成员变量：

    * m_Channel，AMQPClient，MQ连接
    * m_Queue，AMQPQueue
    * m_Name，名字
    * m_ConsumerTag，自定义标签
    * m_MsgQueue，用于预取消息的队列
    * m_Logger，日志对象

  * 成员方法：

    * declared

    ```
    /**
     * 声明
     * @param Conn 连接
     * @param name 名字
     * @param options QueueOptions
     * @param logger 日志
     */
    async declared(Conn : C4MQ, name : string, options : QueueOptions, logger ?: any)
    ```

    <hr>

    * desroy

    ```
    /**
     * 销毁
     * @param options {
     *  ifUnused : boolean,     // 是否在不用后销毁
     *  isEmpty : boolean,      // 是否在空后后销毁
     * }
     */
    desroy(options : { ifUnused : boolean, isEmpty : boolean})
    ```

    <hr>

    * bindExchange

    ```
    /**
     * 绑定Excahnge
     * @param exchangeName excahnge的名字
     * @param routingKey routingKey
     */
    async bindExchange(exchangeName : string, routingKey : string)
    ```

    <hr>

    * unbindExchange

    ```
    /**
     * 解绑
     * @param exchangeName exchange的名字
     * @param routingKey routingKey
     */
    unbindExchange(exchangeName : string, routingKey : string)
    ```

    <hr>

    * bindHeaders

    ```
    /**
     * 绑定Headers
     * @param exchangeName excahnge名字
     * @param routingKey routingKey
     */
    bindHeaders(exchangeName : string, routingKey : string)
    ```

    <hr>

    * unbindHeaders

    ```
    /**
     * 解绑Headers
     * @param exchangeName exchange名
     * @param routingKey routingKeys
     */
    unbindHeaders(exchangeName : string, routingKey : string)
    ```

    <hr>

    * subscribe

    ```
    /**
     * 订阅消息
     * @param options 订阅配置
     * @param CB 消息处理方法，如果不设置，则采用内部机制
     * 
     */
    async subscribe(options : SubscribeOptions, CB ?: SubscribeCallback)
    ```

    <hr>

    * unsubscribe

    ```
    /**
     * 取消订阅
     */
    unsubscribe()
    ```

    <hr>

    * peekMsg

    ```
    /**
     * 去消息并处理
     * @param CB 消息处理方法
     * 订阅消息时没有设置处理方法，则会进行内部处理，然后使用该方法进行单个消息的处理
     */
    async peekMsg(CB : (message : any,
        headers : {[key : string] : any},
        deliveryInfo : DeliveryInfo,
        ack : Ack) => Promise<boolean> | boolean)
    ```

    <hr>

    * getQueueInstance

    ```
    /**
     * 获取Queue实例
     */
    getQueueInstance()
    ```

    <hr>

    * isInit

    ```
    /**
     * 是否已经初始化
     */
    isInit()
    ```

    <hr>

    * getName

    ```
    /**
     * 获取Queue名
     */
    getName()
    ```

  <hr>

* C4Publisher

  * 说明：对C4Exchange的封装，主要发送消息；
  * 路径：./src/C4Publisher.ts
  * 成员变量：

    * m_Exchange，C4Exchange；
    * m_PublishOption，ExchangePublishOptions；
    * m_RoutingKey，routingkey；
    * m_Logger，日志对象

  * 成员方法：

    * init

    ```
    /**
     * 初始化
     * @param Conn C4MQ，MQ连接
     * @param option C4PublisherOption
     * @param logger 日志对象
     */
    async init(Conn : C4MQ, option : C4PublisherOption, logger ?: any)
    ```

    <hr>

    * publish

    ```
    /**
     * 发布消息
     * @param message 消息
     * @param routingKey routingKey
     * @param option ExchangePublishOptions
     */
     async publish(message : {} | Buffer, routingKey ?: string, option ?: ExchangePublishOptions)
    ```

    <hr>

    * isInit

    ```
    /**
     * 是否初始化
     */
    isInit()
    ```

    <hr>

    * getName

    ```
    /**
     * 获取Exchange的名字
     */
    getName()
    ```

  <hr>

* C4Subscriber


  * 说明：对C4Queue的封装，支持注解添加消息处理方法；
  * 路径：./src/C4Subscriber.ts
  * 成员变量：

    * m_Queue，C4Queue；
    * m_DefaultPublisher，默认绑定的Publisher名；
    * m_SubscribeOptions，订阅配置项；
    * m_Logger，日志对象；
    * m_CBs，消息处理方法；

  * 成员方法：

    * init

    ```
    /**
     * 初始化
     * @param Conn C4MQ连接，MQ连接
     * @param option C4SubscriberOption
     * @param logger 日志对象
     */
    async init(Conn : C4MQ, option : C4SubscriberOption, logger ?: any)
    ```

    <hr>

    * addSubscribe

    ```
    /**
     * 添加订阅配置
     * @param option C4SubscribeOption
     */
    addSubscribe(option : C4SubscribeOption)
    ```

    <hr>

    * subscribe

    ```
    /**
     * 开始订阅
     */
    async subscribe()
    ```

    <hr>

    * __processMsg

    ```
    /**
     * 消息处理方法
     */
    async __processMsg()
    ```

    <hr>

    * addMQHandler

    ```
    /**
     * 添加消息处理方法
     * @param handlers 方法对象或者加载路径
     */
    async addMQHandler(handlers : Array<any>) : Promise<any>;
    async addMQHandler(handlerPaths : string[]) : Promise<any>;
    async addMQHandler(arg : Array<any | string>)
    ```

    <hr>

    * isInit

    ```
    /**
     * 是否初始化
     */
    isInit()
    ```

    <hr>

    * getName

    ```
    /**
     * 获取Queue的名字
     */
    getName()
    ```

    <hr>
