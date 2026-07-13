const notes = [
  {
    id: "java-core",
    category: "Java",
    title: "Java Core Concepts",
    icon: "☕",
    color: "#e76f00",
    topics: [
      {
        heading: "OOP Principles",
        points: [
          "**Encapsulation** — Bundling data and methods that operate on data within a single unit (class). Use access modifiers (private, protected, public) to control visibility.",
          "**Inheritance** — A class can inherit fields and methods from another class using `extends`. Java supports single inheritance only.",
          "**Polymorphism** — Same method name behaves differently based on the object. Compile-time (overloading) and Runtime (overriding).",
          "**Abstraction** — Hiding implementation details using abstract classes or interfaces. Focus on *what* an object does, not *how*.",
        ],
      },
      {
        heading: "Collections Framework",
        points: [
          "**List** — Ordered, allows duplicates. `ArrayList` (fast read), `LinkedList` (fast insert/delete).",
          "**Set** — No duplicates. `HashSet` (unordered), `LinkedHashSet` (insertion order), `TreeSet` (sorted).",
          "**Map** — Key-value pairs. `HashMap` (unordered), `LinkedHashMap` (insertion order), `TreeMap` (sorted keys), `ConcurrentHashMap` (thread-safe).",
          "**Queue** — FIFO. `PriorityQueue`, `ArrayDeque`, `LinkedList`.",
          "**When to use what:** ArrayList for most cases, LinkedList for frequent insertions, HashSet for uniqueness, HashMap for lookups.",
        ],
      },
      {
        heading: "Java 8+ Features",
        points: [
          "**Lambda Expressions** — `(params) -> expression`. Enables functional programming. Example: `list.forEach(item -> System.out.println(item))`.",
          "**Stream API** — Process collections declaratively: `filter()`, `map()`, `reduce()`, `collect()`. Supports parallel processing.",
          "**Optional** — Container to avoid NullPointerException. `Optional.of()`, `Optional.ofNullable()`, `orElse()`, `ifPresent()`.",
          "**Default Methods** — Interfaces can have method implementations using `default` keyword.",
          "**CompletableFuture** — Async programming. Chain tasks with `thenApply()`, `thenCompose()`, `thenCombine()`.",
        ],
      },
      {
        heading: "Exception Handling",
        points: [
          "**Checked Exceptions** — Must be handled at compile time (IOException, SQLException). Use try-catch or `throws`.",
          "**Unchecked Exceptions** — Runtime exceptions (NullPointerException, ArrayIndexOutOfBoundsException). Not forced to handle.",
          "**Custom Exceptions** — Extend `Exception` (checked) or `RuntimeException` (unchecked).",
          "**Best Practice** — Catch specific exceptions, never catch `Exception` broadly. Use try-with-resources for AutoCloseable.",
        ],
      },
      {
        heading: "Multithreading & Concurrency",
        points: [
          "**Thread Creation** — Extend `Thread` class or implement `Runnable` interface. Prefer `Runnable`.",
          "**synchronized** — Ensures only one thread accesses a block/method at a time. Can cause deadlocks.",
          "**ExecutorService** — Thread pool management. `Executors.newFixedThreadPool(n)`, `submit()`, `shutdown()`.",
          "**volatile** — Ensures visibility of changes across threads. Does NOT ensure atomicity.",
          "**Atomic Classes** — `AtomicInteger`, `AtomicLong` for lock-free thread-safe operations.",
        ],
      },
    ],
  },
  {
    id: "spring-boot",
    category: "Spring Boot",
    title: "Spring Boot Essentials",
    icon: "🍃",
    color: "#6db33f",
    topics: [
      {
        heading: "Core Annotations",
        points: [
          "**@SpringBootApplication** — Combines `@Configuration`, `@EnableAutoConfiguration`, `@ComponentScan`. Entry point.",
          "**@RestController** — Combines `@Controller` + `@ResponseBody`. Returns JSON/XML directly.",
          "**@RequestMapping / @GetMapping / @PostMapping** — Map HTTP requests to handler methods.",
          "**@Autowired** — Dependency injection. Prefer constructor injection over field injection.",
          "**@Component / @Service / @Repository** — Stereotype annotations for Spring-managed beans.",
        ],
      },
      {
        heading: "Spring Boot Architecture",
        points: [
          "**Controller Layer** — Handles HTTP requests, validates input, delegates to service layer.",
          "**Service Layer** — Business logic. Annotated with `@Service`. Transactional operations.",
          "**Repository Layer** — Data access using Spring Data JPA. Extends `JpaRepository<Entity, ID>`.",
          "**DTO Pattern** — Data Transfer Objects to decouple API response from entity structure.",
          "**Exception Handling** — Use `@ControllerAdvice` + `@ExceptionHandler` for global error handling.",
        ],
      },
      {
        heading: "Configuration & Profiles",
        points: [
          "**application.properties / application.yml** — Externalized configuration.",
          "**@Value** — Inject property values. Example: `@Value(\"${app.name}\") String appName`.",
          "**@ConfigurationProperties** — Type-safe configuration binding to a POJO.",
          "**Profiles** — `spring.profiles.active=dev`. Separate configs: `application-dev.yml`, `application-prod.yml`.",
          "**Environment Variables** — Override properties via env vars: `SERVER_PORT=9090`.",
        ],
      },
      {
        heading: "Spring Data JPA",
        points: [
          "**Entity** — `@Entity`, `@Table`, `@Id`, `@GeneratedValue`. Maps Java class to DB table.",
          "**Repository Methods** — `findById()`, `findAll()`, `save()`, `deleteById()`. Auto-implemented.",
          "**Custom Queries** — `@Query(\"SELECT u FROM User u WHERE u.email = ?1\")`. JPQL or native SQL.",
          "**Derived Queries** — Method naming convention: `findByNameAndAge()`, `findByEmailContaining()`.",
          "**Pagination** — `Pageable` parameter + `Page<T>` return type. `PageRequest.of(page, size)`.",
        ],
      },
      {
        heading: "Security Basics",
        points: [
          "**Spring Security** — Add `spring-boot-starter-security`. Auto-configures basic auth.",
          "**JWT Authentication** — Stateless auth. Generate token on login, validate on each request.",
          "**@PreAuthorize** — Method-level security. Example: `@PreAuthorize(\"hasRole('ADMIN')\")`.",
          "**CORS** — Configure with `@CrossOrigin` or global `WebMvcConfigurer`.",
          "**Password Encoding** — Always use `BCryptPasswordEncoder`. Never store plain text passwords.",
        ],
      },
    ],
  },
  {
    id: "database-sql",
    category: "Database & SQL",
    title: "Database & SQL Notes",
    icon: "🗄️",
    color: "#336791",
    topics: [
      {
        heading: "SQL Fundamentals",
        points: [
          "**SELECT** — `SELECT col1, col2 FROM table WHERE condition ORDER BY col ASC/DESC LIMIT n`.",
          "**JOINs** — `INNER JOIN` (matching rows), `LEFT JOIN` (all from left), `RIGHT JOIN` (all from right), `FULL OUTER JOIN` (all from both).",
          "**GROUP BY & HAVING** — Aggregate data: `SELECT dept, COUNT(*) FROM emp GROUP BY dept HAVING COUNT(*) > 5`.",
          "**Subqueries** — Nested queries: `SELECT * FROM emp WHERE salary > (SELECT AVG(salary) FROM emp)`.",
          "**UNION vs UNION ALL** — UNION removes duplicates, UNION ALL keeps all rows (faster).",
        ],
      },
      {
        heading: "Indexes & Performance",
        points: [
          "**B-Tree Index** — Default index type. Good for equality and range queries. `CREATE INDEX idx_name ON table(column)`.",
          "**Composite Index** — Index on multiple columns. Order matters — leftmost prefix rule.",
          "**EXPLAIN / EXPLAIN ANALYZE** — Analyze query execution plan. Look for sequential scans on large tables.",
          "**Query Optimization** — Avoid SELECT *, use specific columns. Avoid functions on indexed columns in WHERE clause.",
          "**Connection Pooling** — Use HikariCP (Spring Boot default). Reuse connections instead of creating new ones.",
        ],
      },
      {
        heading: "Normalization",
        points: [
          "**1NF** — Atomic values, no repeating groups. Each cell contains a single value.",
          "**2NF** — 1NF + no partial dependencies. Every non-key column depends on the entire primary key.",
          "**3NF** — 2NF + no transitive dependencies. Non-key columns depend only on the primary key.",
          "**BCNF** — Stricter 3NF. Every determinant is a candidate key.",
          "**When to Denormalize** — Read-heavy systems, reporting tables, caching layers. Trade storage for speed.",
        ],
      },
      {
        heading: "Transactions & ACID",
        points: [
          "**Atomicity** — All or nothing. If any part fails, entire transaction rolls back.",
          "**Consistency** — Database moves from one valid state to another. Constraints are enforced.",
          "**Isolation** — Concurrent transactions don't interfere. Levels: READ_UNCOMMITTED, READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE.",
          "**Durability** — Committed data survives system crashes. Written to persistent storage.",
          "**Spring @Transactional** — Manages transactions declaratively. Default: REQUIRED propagation, RuntimeException triggers rollback.",
        ],
      },
      {
        heading: "NoSQL Overview",
        points: [
          "**Document DB (MongoDB)** — JSON-like documents. Flexible schema. Good for content management, catalogs.",
          "**Key-Value (Redis)** — In-memory, fast lookups. Caching, session storage, rate limiting.",
          "**Column-Family (Cassandra)** — Wide-column store. High write throughput, time-series data.",
          "**Graph DB (Neo4j)** — Nodes and relationships. Social networks, recommendation engines.",
          "**When SQL vs NoSQL** — SQL for complex queries, relationships, ACID. NoSQL for scale, flexibility, specific access patterns.",
        ],
      },
    ],
  },
  {
    id: "microservices",
    category: "Microservices",
    title: "Microservices Architecture",
    icon: "🔗",
    color: "#ff6b6b",
    topics: [
      {
        heading: "Core Principles",
        points: [
          "**Single Responsibility** — Each service owns one business capability. Small, focused, independently deployable.",
          "**Loose Coupling** — Services communicate via APIs, not shared databases. Changes in one don't break others.",
          "**Independent Deployment** — Each service has its own CI/CD pipeline, versioning, and release cycle.",
          "**Decentralized Data** — Each microservice owns its database. No shared database pattern.",
          "**Domain-Driven Design** — Define bounded contexts. Each service maps to a business domain.",
        ],
      },
      {
        heading: "Communication Patterns",
        points: [
          "**Synchronous (REST/gRPC)** — Direct request-response. Simple but creates coupling. Use for real-time needs.",
          "**Asynchronous (Message Queue)** — RabbitMQ, Kafka. Decoupled, resilient. Use for event-driven flows.",
          "**API Gateway** — Single entry point. Routing, auth, rate limiting, load balancing. Tools: Spring Cloud Gateway, Kong.",
          "**Service Discovery** — Services register and find each other dynamically. Eureka, Consul, Kubernetes DNS.",
          "**Event Sourcing** — Store state changes as events. Rebuild state by replaying. Good for audit trails.",
        ],
      },
      {
        heading: "Resilience Patterns",
        points: [
          "**Circuit Breaker** — Prevent cascade failures. States: Closed → Open → Half-Open. Use Resilience4j.",
          "**Retry with Backoff** — Retry failed calls with exponential delay. Avoid thundering herd.",
          "**Bulkhead** — Isolate resources per service. Thread pool or semaphore isolation.",
          "**Timeout** — Set timeouts on all external calls. Fail fast rather than wait indefinitely.",
          "**Fallback** — Return default/cached response when a service is down. Graceful degradation.",
        ],
      },
      {
        heading: "Spring Cloud Stack",
        points: [
          "**Spring Cloud Gateway** — API Gateway. Route definitions, filters, predicates.",
          "**Spring Cloud Config** — Centralized configuration server. Git-backed config for all services.",
          "**Eureka** — Service registry and discovery. `@EnableEurekaServer`, `@EnableDiscoveryClient`.",
          "**OpenFeign** — Declarative REST client. `@FeignClient(name = \"user-service\")`. Built-in load balancing.",
          "**Sleuth + Zipkin** — Distributed tracing. Trace requests across services. Visualize latency.",
        ],
      },
      {
        heading: "Deployment & Monitoring",
        points: [
          "**Docker** — Containerize each service. Consistent environment across dev/staging/prod.",
          "**Kubernetes** — Orchestrate containers. Auto-scaling, self-healing, rolling updates.",
          "**Health Checks** — `/actuator/health`. Liveness and readiness probes for K8s.",
          "**Centralized Logging** — ELK Stack (Elasticsearch, Logstash, Kibana) or Grafana Loki.",
          "**Metrics** — Micrometer + Prometheus + Grafana. Monitor latency, error rates, throughput.",
        ],
      },
    ],
  },
  {
    id: "design-patterns",
    category: "Design Patterns",
    title: "Design Patterns in Java",
    icon: "🏗️",
    color: "#9b59b6",
    topics: [
      {
        heading: "Creational Patterns",
        points: [
          "**Singleton** — One instance globally. Use `enum` or double-checked locking. Spring beans are singleton by default.",
          "**Factory Method** — Create objects without specifying exact class. `PaymentFactory.create(\"UPI\")` returns UPIPayment.",
          "**Builder** — Construct complex objects step by step. `User.builder().name(\"John\").age(30).build()`. Use Lombok `@Builder`.",
          "**Prototype** — Clone existing objects. Implement `Cloneable`. Useful for expensive object creation.",
        ],
      },
      {
        heading: "Structural Patterns",
        points: [
          "**Adapter** — Convert one interface to another. Wrap legacy code to work with new systems.",
          "**Decorator** — Add behavior dynamically. Java I/O streams use this: `BufferedReader(new FileReader(file))`.",
          "**Proxy** — Control access to an object. Spring AOP uses proxies for `@Transactional`, `@Cacheable`.",
          "**Facade** — Simplified interface to a complex subsystem. Service layer is a facade over repositories.",
        ],
      },
      {
        heading: "Behavioral Patterns",
        points: [
          "**Strategy** — Define a family of algorithms, make them interchangeable. Payment processing with different strategies.",
          "**Observer** — Publish-subscribe. Spring's `ApplicationEventPublisher` and `@EventListener`.",
          "**Template Method** — Define algorithm skeleton, let subclasses override steps. `JdbcTemplate` in Spring.",
          "**Chain of Responsibility** — Pass request through a chain of handlers. Servlet filters, Spring Security filter chain.",
        ],
      },
    ],
  },
  {
    id: "system-design",
    category: "System Design",
    title: "System Design Concepts",
    icon: "🌐",
    color: "#e67e22",
    topics: [
      {
        heading: "Scalability",
        points: [
          "**Horizontal Scaling** — Add more machines. Stateless services, load balancers. Preferred for microservices.",
          "**Vertical Scaling** — Bigger machine (more CPU/RAM). Simpler but has limits. Good for databases.",
          "**Load Balancing** — Distribute traffic. Round-robin, least connections, IP hash. Tools: Nginx, HAProxy, AWS ALB.",
          "**Database Sharding** — Split data across multiple databases by key (user_id, region). Reduces per-DB load.",
          "**CDN** — Cache static assets at edge locations. Reduce latency for global users.",
        ],
      },
      {
        heading: "Caching",
        points: [
          "**Cache-Aside (Lazy Loading)** — App checks cache first, loads from DB on miss, writes to cache.",
          "**Write-Through** — Write to cache and DB simultaneously. Consistent but slower writes.",
          "**Write-Behind** — Write to cache, async write to DB. Fast but risk of data loss.",
          "**Redis** — In-memory data store. TTL-based expiry. Use for sessions, rate limiting, leaderboards.",
          "**Cache Invalidation** — The hardest problem. TTL, event-based invalidation, versioned keys.",
        ],
      },
      {
        heading: "Message Queues",
        points: [
          "**Apache Kafka** — Distributed event streaming. High throughput, persistent, partitioned topics.",
          "**RabbitMQ** — Traditional message broker. Exchanges, queues, bindings. Good for task distribution.",
          "**Use Cases** — Async processing, event-driven architecture, decoupling services, buffering spikes.",
          "**Dead Letter Queue** — Failed messages go here for retry or manual inspection.",
          "**Exactly-Once vs At-Least-Once** — Kafka supports exactly-once. Design consumers to be idempotent.",
        ],
      },
      {
        heading: "API Design",
        points: [
          "**REST Best Practices** — Use nouns for resources, HTTP verbs for actions. Versioning: `/api/v1/users`.",
          "**Pagination** — Offset-based (`?page=2&size=20`) or cursor-based (better for large datasets).",
          "**Rate Limiting** — Token bucket or sliding window. Return `429 Too Many Requests`.",
          "**Idempotency** — Same request produces same result. Use idempotency keys for POST/PUT.",
          "**GraphQL** — Client specifies exact data needed. Reduces over-fetching. Good for complex UIs.",
        ],
      },
    ],
  },
  {
    id: "devops",
    category: "DevOps",
    title: "DevOps & CI/CD",
    icon: "⚙️",
    color: "#2ecc71",
    topics: [
      {
        heading: "Docker Essentials",
        points: [
          "**Dockerfile** — `FROM openjdk:17`, `COPY target/*.jar app.jar`, `ENTRYPOINT [\"java\", \"-jar\", \"app.jar\"]`.",
          "**Multi-stage Build** — Build in one stage, run in another. Smaller final image.",
          "**Docker Compose** — Define multi-container apps. `docker-compose.yml` for app + DB + Redis.",
          "**Best Practices** — Use specific base image tags, minimize layers, don't run as root, use .dockerignore.",
        ],
      },
      {
        heading: "CI/CD Pipeline",
        points: [
          "**GitHub Actions** — YAML workflow files in `.github/workflows/`. Trigger on push, PR, schedule.",
          "**Pipeline Stages** — Build → Test → Code Quality → Security Scan → Deploy.",
          "**Blue-Green Deployment** — Two identical environments. Switch traffic after validation.",
          "**Canary Deployment** — Route small % of traffic to new version. Monitor, then roll out fully.",
        ],
      },
      {
        heading: "Kubernetes Basics",
        points: [
          "**Pod** — Smallest deployable unit. One or more containers sharing network/storage.",
          "**Deployment** — Manages ReplicaSets. Rolling updates, rollback support.",
          "**Service** — Stable network endpoint for pods. ClusterIP (internal), NodePort, LoadBalancer.",
          "**ConfigMap & Secret** — Externalize config. Secrets are base64-encoded (not encrypted by default).",
          "**Helm** — Package manager for K8s. Charts define, install, and upgrade applications.",
        ],
      },
    ],
  },
  {
    id: "testing",
    category: "Testing",
    title: "Testing in Java/Spring",
    icon: "🧪",
    color: "#1abc9c",
    topics: [
      {
        heading: "Unit Testing",
        points: [
          "**JUnit 5** — `@Test`, `@BeforeEach`, `@AfterEach`, `@DisplayName`. Assertions: `assertEquals`, `assertThrows`.",
          "**Mockito** — Mock dependencies. `@Mock`, `@InjectMocks`, `when().thenReturn()`, `verify()`.",
          "**Test Structure** — Arrange → Act → Assert (AAA pattern). One assertion concept per test.",
          "**Code Coverage** — JaCoCo for coverage reports. Aim for meaningful coverage, not 100%.",
        ],
      },
      {
        heading: "Integration Testing",
        points: [
          "**@SpringBootTest** — Loads full application context. Slower but tests real wiring.",
          "**@WebMvcTest** — Tests controller layer only. Use `MockMvc` for HTTP request simulation.",
          "**@DataJpaTest** — Tests repository layer with embedded DB (H2). Auto-rollback after each test.",
          "**Testcontainers** — Run real databases (Postgres, MySQL, Redis) in Docker during tests.",
        ],
      },
      {
        heading: "Testing Best Practices",
        points: [
          "**Test Naming** — `should_ReturnUser_When_ValidIdProvided()`. Describe behavior, not method name.",
          "**Test Pyramid** — Many unit tests, fewer integration tests, minimal E2E tests.",
          "**Don't Test Frameworks** — Don't test Spring, JPA, or library internals. Test YOUR logic.",
          "**Test Data Builders** — Create reusable builders for test objects. Avoid hardcoded test data.",
        ],
      },
    ],
  },
];

export default notes;
