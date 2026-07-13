export const subsections = [
  {
    id: "scalability",
    title: "Scalability",
    topics: [
      {
        heading: "Scaling Strategies",
        points: [
          "**Horizontal Scaling** — Add more machines/instances behind a load balancer. Stateless services scale easily; stateful services need shared storage or sticky sessions.",
          "**Vertical Scaling** — Upgrade CPU, RAM, or disk on existing machine. Simpler but has hardware limits. Good for databases before sharding.",
          "**Database Sharding** — Partition data across multiple databases by shard key (user ID, region). Reduces per-node load. Challenges: cross-shard queries, rebalancing.",
          "**Read Replicas** — Replicate database writes to read-only copies. Route read queries to replicas, writes to primary. Eventual consistency trade-off.",
          "**Auto-Scaling** — Cloud-based dynamic scaling triggered by metrics (CPU, request count, queue depth). Scale-out on demand, scale-in to save cost.",
        ],
      },
      {
        heading: "Load Balancing",
        points: [
          "**Algorithms** — Round Robin (equal distribution), Weighted Round Robin (capacity-based), Least Connections (route to least busy), IP Hash (sticky sessions).",
          "**L4 vs L7** — Layer 4 (TCP/UDP level, fast, no content inspection) vs Layer 7 (HTTP level, content-based routing, path/header inspection, SSL termination).",
          "**Tools** — NGINX (L7, reverse proxy, static serving), HAProxy (L4/L7, high performance), AWS ALB/NLB, Envoy (service mesh, gRPC-native).",
          "**CDN (Content Delivery Network)** — Cache static assets at edge locations globally. Reduces latency for end users. CloudFront, Cloudflare, Akamai.",
          "**Health Checks** — Load balancer periodically probes backends. Unhealthy instances removed from rotation. Liveness vs readiness distinction matters.",
        ],
      },
    ],
  },
  {
    id: "caching",
    title: "Caching Strategies",
    topics: [
      {
        heading: "Caching Patterns",
        points: [
          "**Cache-Aside (Lazy Loading)** — App checks cache first; on miss, fetches from DB and populates cache. Most common pattern. App controls cache population.",
          "**Write-Through** — App writes to cache, cache synchronously writes to DB. Ensures consistency but adds write latency. Good for read-heavy workloads.",
          "**Write-Behind (Write-Back)** — App writes to cache, cache asynchronously writes to DB in batches. Fast writes but risk of data loss before flush.",
          "**Read-Through** — Cache itself fetches from DB on miss (cache acts as main data source). Simplifies app code. Cache library handles population logic.",
          "**Spring Caching** — `@Cacheable` (read-through), `@CachePut` (update cache), `@CacheEvict` (remove). Configure with `CacheManager` (Redis, Caffeine, EhCache).",
        ],
      },
      {
        heading: "Cache Invalidation",
        points: [
          "**TTL (Time-to-Live)** — Auto-expire cache entries after a duration. Simple but may serve stale data. Balance between freshness and hit rate.",
          "**Event-Based Invalidation** — Publish cache invalidation events on data changes. Kafka, Redis Pub/Sub, or Spring Events. More accurate than TTL alone.",
          "**Versioned Keys** — Include version number in cache key. `user:42:v3`. On update, increment version so old key naturally becomes unused.",
          "**Cache Stampede Prevention** — Many concurrent requests miss cache simultaneously. Solutions: locking (only one fetches), early expiration, probabilistic refresh.",
          "**Consistency Challenges** — Distributed caches across nodes may have stale data. Use short TTLs, invalidation broadcasts, or accept eventual consistency.",
        ],
      },
      {
        heading: "Redis Deep Dive",
        points: [
          "**Data Structures** — Strings, Hashes, Lists, Sets, Sorted Sets, Streams, HyperLogLog. Each optimized for specific use cases beyond simple key-value.",
          "**Use Cases** — Session store, rate limiting (INCR + EXPIRE), leaderboards (Sorted Sets), pub/sub messaging, distributed locks (SETNX + TTL).",
          "**Persistence** — RDB (point-in-time snapshots) vs AOF (append-only log). RDB faster recovery; AOF more durable. Use both in production.",
          "**Redis Cluster** — Automatic sharding across nodes using hash slots (16384 slots). Built-in replication and failover. Scales horizontally.",
          "**Spring Data Redis** — `RedisTemplate` for low-level operations. `@Cacheable` with `RedisCacheManager`. Lettuce (default, reactive) or Jedis client.",
        ],
      },
    ],
  },
  {
    id: "message-queues",
    title: "Message Queues & Events",
    topics: [
      {
        heading: "Apache Kafka",
        points: [
          "**Architecture** — Topics divided into partitions across brokers. Producers append to partitions; consumers read in order. ZooKeeper/KRaft for cluster coordination.",
          "**Delivery Guarantees** — At-most-once (fire and forget), at-least-once (acks + retries, may duplicate), exactly-once (idempotent producer + transactional consumer).",
          "**Use Cases** — Event streaming, log aggregation, change data capture (CDC), real-time analytics pipelines, microservice event bus, audit trails.",
          "**Spring Kafka** — `@KafkaListener` for consumers, `KafkaTemplate` for producers. `@EnableKafka`, consumer group config, error handling with `ErrorHandler`.",
          "**Retention & Compaction** — Time-based retention (default 7 days) or size-based. Log compaction keeps latest value per key. Enables event sourcing patterns.",
        ],
      },
      {
        heading: "RabbitMQ",
        points: [
          "**Architecture** — Exchanges route messages to queues via bindings. Exchange types: Direct, Topic (pattern matching), Fanout (broadcast), Headers.",
          "**Kafka vs RabbitMQ** — Kafka: high throughput, replay, event log. RabbitMQ: flexible routing, message acknowledgment, lower latency for task queues.",
          "**Spring AMQP** — `RabbitTemplate` for sending, `@RabbitListener` for consuming. `@EnableRabbit`. Auto-declare exchanges, queues, and bindings.",
          "**Dead Letter Queue (DLQ)** — Failed messages routed to DLQ after max retries. Configure `x-dead-letter-exchange` and `x-dead-letter-routing-key`. Enables error analysis.",
          "**Reliability** — Publisher confirms (acks from broker), consumer acknowledgments, persistent messages, mirrored queues for high availability.",
        ],
      },
    ],
  },
  {
    id: "api-design",
    title: "API Design",
    topics: [
      {
        heading: "REST Best Practices",
        points: [
          "**Resource Naming** — Use nouns, not verbs. Plural: `/users`, `/orders/{id}/items`. Lowercase, hyphens for multi-word. Nest for relationships (max 2 levels).",
          "**HTTP Methods** — GET (read), POST (create), PUT (full update), PATCH (partial update), DELETE (remove). Idempotency: GET, PUT, DELETE are idempotent.",
          "**Status Codes** — 200 (OK), 201 (Created), 204 (No Content), 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 409 (Conflict), 500 (Server Error).",
          "**Versioning** — URI path (`/v1/users`), header (`Accept: application/vnd.api.v1+json`), or query param (`?version=1`). URI path most common and readable.",
          "**HATEOAS** — Hypermedia as the Engine of Application State. Responses include links to related actions. Spring HATEOAS `EntityModel`, `Link`, `WebMvcLinkBuilder`.",
        ],
      },
      {
        heading: "Pagination, Filtering & Search",
        points: [
          "**Offset Pagination** — `?page=2&size=20`. Simple but slow for large offsets (DB scans skipped rows). Include `totalElements` and `totalPages` in response.",
          "**Cursor Pagination** — `?cursor=abc123&size=20`. Uses last-seen ID/timestamp. Efficient for large datasets. No page jumping but consistent performance.",
          "**Filtering** — Query params: `?status=active&minAge=18`. Spring: `@RequestParam`, Specification pattern, or QueryDSL for dynamic filters.",
          "**Sorting** — `?sort=name,asc&sort=createdAt,desc`. Spring Data: `Pageable` parameter handles sort + pagination. `Sort.by(Direction.ASC, \"name\")`.",
          "**Search** — Full-text search with Elasticsearch or database `LIKE`/`ILIKE`. Query param: `?q=search+term`. Consider dedicated search endpoints for complex queries.",
        ],
      },
      {
        heading: "GraphQL vs REST",
        points: [
          "**GraphQL** — Client specifies exact data shape needed. Single endpoint. No over-fetching or under-fetching. Schema-first with strong typing.",
          "**REST Advantages** — Simpler, well-understood, HTTP caching works naturally, better tooling ecosystem, easier to rate-limit per endpoint.",
          "**GraphQL Advantages** — Flexible queries, single request for complex data, auto-generated documentation, strongly typed schema, great for mobile clients.",
          "**N+1 Problem** — GraphQL resolvers may trigger N+1 queries. Solve with DataLoader (batching) or join-based fetching strategies.",
          "**When to Choose** — REST: simple CRUD, public APIs, caching-heavy. GraphQL: complex data relationships, multiple client types, rapidly evolving frontends.",
        ],
      },
    ],
  },
];
