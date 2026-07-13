export const subsections = [
  {
    id: "core-java",
    title: "Core Java",
    topics: [
      {
        heading: "OOP Principles",
        points: [
          "**Encapsulation** — Bundling data and methods within a single unit (class). Use access modifiers (private, protected, public) to control visibility.",
          "**Inheritance** — A class inherits fields and methods from another using `extends`. Java supports single inheritance only. Use `super` to call parent.",
          "**Polymorphism** — Same method behaves differently. Compile-time (method overloading) and Runtime (method overriding via `@Override`).",
          "**Abstraction** — Hide implementation using abstract classes or interfaces. Focus on *what* not *how*.",
        ],
      },
      {
        heading: "Data Types & Variables",
        points: [
          "**Primitive Types** — `byte`(1B), `short`(2B), `int`(4B), `long`(8B), `float`(4B), `double`(8B), `char`(2B), `boolean`.",
          "**Wrapper Classes** — `Integer`, `Double`, `Boolean` etc. Autoboxing/Unboxing converts automatically between primitive and wrapper.",
          "**String** — Immutable. `String pool` for memory optimization. Use `StringBuilder` for frequent modifications.",
          "**var (Java 10+)** — Local variable type inference. `var list = new ArrayList<String>()`. Only for local variables.",
          "**final** — Variable: constant value. Method: cannot override. Class: cannot extend.",
        ],
      },
      {
        heading: "Keywords & Concepts",
        points: [
          "**static** — Belongs to class, not instance. Static methods can't access instance variables. `static` block runs once at class loading.",
          "**this** — Refers to current instance. Used to resolve ambiguity, chain constructors `this()`, and pass current object.",
          "**super** — Refers to parent class. Call parent constructor `super()`, access parent methods `super.method()`.",
          "**instanceof** — Type checking. `if (obj instanceof String s)` — pattern matching (Java 16+).",
          "**sealed (Java 17+)** — `sealed class Shape permits Circle, Square` — restrict which classes can extend.",
        ],
      },
      {
        heading: "Interfaces & Abstract Classes",
        points: [
          "**Interface** — Contract with abstract methods. A class can implement multiple interfaces. Default methods allowed (Java 8+).",
          "**Abstract Class** — Partial implementation. Can have constructors, fields, abstract + concrete methods. Single inheritance only.",
          "**When to Use** — Interface: define capability (`Comparable`, `Serializable`). Abstract class: share code among related classes.",
          "**Functional Interface** — Interface with single abstract method. `@FunctionalInterface`. Used with lambdas. e.g., `Runnable`, `Predicate<T>`.",
        ],
      },
    ],
  },
  {
    id: "collections",
    title: "Collections Framework",
    topics: [
      {
        heading: "List Implementations",
        points: [
          "**ArrayList** — Dynamic array. O(1) random access, O(n) insert/delete in middle. Best for read-heavy operations.",
          "**LinkedList** — Doubly-linked list. O(1) insert/delete at ends, O(n) random access. Also implements `Deque`.",
          "**Vector** — Synchronized ArrayList. Thread-safe but slower. Use `Collections.synchronizedList()` instead.",
          "**CopyOnWriteArrayList** — Thread-safe. Creates copy on write. Best for read-heavy concurrent scenarios.",
          "**List.of()** — Immutable list factory (Java 9+). `List.of(\"a\", \"b\", \"c\")`. Throws `UnsupportedOperationException` on modification.",
        ],
      },
      {
        heading: "Set Implementations",
        points: [
          "**HashSet** — No duplicates, unordered. O(1) add/remove/contains. Backed by HashMap internally.",
          "**LinkedHashSet** — Maintains insertion order. Slightly slower than HashSet due to linked list overhead.",
          "**TreeSet** — Sorted order (natural or Comparator). O(log n) operations. Implements `NavigableSet`.",
          "**EnumSet** — Specialized for enum types. Extremely fast. Use `EnumSet.of()`, `EnumSet.allOf()`.",
        ],
      },
      {
        heading: "Map Implementations",
        points: [
          "**HashMap** — Key-value pairs. O(1) get/put. Allows one null key, multiple null values. Not thread-safe.",
          "**LinkedHashMap** — Maintains insertion order (or access order for LRU cache). Extends HashMap.",
          "**TreeMap** — Sorted by keys. O(log n) operations. Implements `NavigableMap`. No null keys allowed.",
          "**ConcurrentHashMap** — Thread-safe without locking entire map. Segment-level locking. No null keys/values.",
          "**Map.of() / Map.entry()** — Immutable map factory (Java 9+). Max 10 entries with `Map.of()`, use `Map.ofEntries()` for more.",
        ],
      },
      {
        heading: "Queue & Deque",
        points: [
          "**PriorityQueue** — Elements ordered by priority (natural order or Comparator). O(log n) insert, O(1) peek.",
          "**ArrayDeque** — Double-ended queue. Faster than LinkedList as Queue/Stack. No capacity restrictions.",
          "**BlockingQueue** — Thread-safe. `ArrayBlockingQueue` (bounded), `LinkedBlockingQueue`. Producer-consumer pattern.",
          "**DelayQueue** — Elements available only after delay expires. Used for scheduled tasks.",
        ],
      },
      {
        heading: "Utility Methods",
        points: [
          "**Collections.sort()** — Sort list. Use `Comparator.comparing()` for custom sorting. `list.sort(Comparator.comparing(User::getName))`.",
          "**Collections.unmodifiableList()** — Returns read-only view. Prefer `List.copyOf()` (Java 10+) for true immutable copy.",
          "**Collections.frequency()** — Count occurrences: `Collections.frequency(list, element)`.",
          "**Streams on Collections** — `collection.stream().filter().map().collect()`. Prefer streams for transformation pipelines.",
        ],
      },
    ],
  },
  {
    id: "java8-features",
    title: "Java 8+ Features",
    topics: [
      {
        heading: "Lambda Expressions",
        points: [
          "**Syntax** — `(params) -> expression` or `(params) -> { statements; }`. Replaces anonymous inner classes.",
          "**Method References** — `Class::method`. Types: static (`String::valueOf`), instance (`str::length`), constructor (`ArrayList::new`).",
          "**Effectively Final** — Lambdas can capture local variables that are effectively final (not reassigned).",
          "**Common Functional Interfaces** — `Predicate<T>` (test), `Function<T,R>` (apply), `Consumer<T>` (accept), `Supplier<T>` (get).",
        ],
      },
      {
        heading: "Stream API",
        points: [
          "**Creating Streams** — `collection.stream()`, `Stream.of()`, `Arrays.stream()`, `Stream.generate()`, `Stream.iterate()`.",
          "**Intermediate Ops** — `filter()`, `map()`, `flatMap()`, `distinct()`, `sorted()`, `peek()`, `limit()`, `skip()`. Lazy evaluation.",
          "**Terminal Ops** — `collect()`, `forEach()`, `reduce()`, `count()`, `findFirst()`, `anyMatch()`, `toList()` (Java 16+).",
          "**Collectors** — `Collectors.toList()`, `toMap()`, `groupingBy()`, `partitioningBy()`, `joining()`, `summarizingInt()`.",
          "**Parallel Streams** — `parallelStream()` or `.parallel()`. Use for CPU-intensive tasks on large datasets. Avoid for I/O.",
        ],
      },
      {
        heading: "Optional",
        points: [
          "**Creating** — `Optional.of(value)` (non-null), `Optional.ofNullable(value)` (may be null), `Optional.empty()`.",
          "**Consuming** — `ifPresent()`, `orElse()`, `orElseGet()`, `orElseThrow()`. Never call `get()` without `isPresent()` check.",
          "**Transforming** — `map()`, `flatMap()`, `filter()`. Chain operations on Optional values.",
          "**Best Practice** — Use as return type, not as field or parameter. Don't use `Optional.of(null)` — it throws NPE.",
        ],
      },
      {
        heading: "Date & Time API (java.time)",
        points: [
          "**LocalDate** — Date without time. `LocalDate.now()`, `LocalDate.of(2024, 1, 15)`, `plusDays()`, `minusMonths()`.",
          "**LocalTime** — Time without date. `LocalTime.now()`, `LocalTime.of(14, 30)`. `isBefore()`, `isAfter()`.",
          "**LocalDateTime** — Date + time without timezone. Combine: `LocalDateTime.of(date, time)`.",
          "**ZonedDateTime** — With timezone. `ZonedDateTime.now(ZoneId.of(\"Asia/Kolkata\"))`. For global applications.",
          "**Duration & Period** — `Duration` for time-based (hours, minutes). `Period` for date-based (years, months, days).",
        ],
      },
      {
        heading: "Records, Sealed & Pattern Matching",
        points: [
          "**Records (Java 14+)** — `record Point(int x, int y) {}`. Auto-generates constructor, getters, equals, hashCode, toString.",
          "**Sealed Classes (Java 17+)** — `sealed class Shape permits Circle, Square {}`. Restrict class hierarchy.",
          "**Pattern Matching instanceof (Java 16+)** — `if (obj instanceof String s)` — no explicit cast needed.",
          "**Switch Expressions (Java 14+)** — `var result = switch(day) { case MON -> \"Monday\"; default -> \"Other\"; };`.",
          "**Text Blocks (Java 15+)** — Multi-line strings with `\"\"\"`. Preserves formatting.",
        ],
      },
    ],
  },
  {
    id: "multithreading",
    title: "Multithreading & Concurrency",
    topics: [
      {
        heading: "Thread Basics",
        points: [
          "**Creating Threads** — Extend `Thread` class or implement `Runnable`. Prefer `Runnable` (allows extending other classes).",
          "**Thread Lifecycle** — NEW → RUNNABLE → RUNNING → BLOCKED/WAITING → TERMINATED.",
          "**Thread Methods** — `start()`, `run()`, `sleep()`, `join()`, `yield()`, `interrupt()`. Never call `run()` directly.",
          "**Daemon Threads** — Background threads. `thread.setDaemon(true)`. JVM exits when only daemon threads remain.",
        ],
      },
      {
        heading: "Synchronization",
        points: [
          "**synchronized keyword** — Method or block level. Only one thread accesses at a time. Intrinsic lock on object/class.",
          "**volatile** — Ensures visibility across threads. Reads/writes go directly to main memory. Does NOT ensure atomicity.",
          "**Deadlock** — Two threads each hold a lock the other needs. Prevent: consistent lock ordering, timeout, `tryLock()`.",
          "**ReentrantLock** — Explicit lock with `lock()` / `unlock()`. Supports fairness, `tryLock()`, `lockInterruptibly()`.",
        ],
      },
      {
        heading: "Executor Framework",
        points: [
          "**ExecutorService** — Thread pool. `Executors.newFixedThreadPool(n)`, `newCachedThreadPool()`, `newSingleThreadExecutor()`.",
          "**Future & Callable** — `Callable<V>` returns value. `Future<V>` holds result. `future.get()` blocks until done.",
          "**CompletableFuture** — Async pipelines. `supplyAsync()`, `thenApply()`, `thenCompose()`, `thenCombine()`, `exceptionally()`.",
          "**ScheduledExecutorService** — Schedule tasks: `scheduleAtFixedRate()`, `scheduleWithFixedDelay()`.",
          "**Virtual Threads (Java 21+)** — Lightweight threads. `Thread.ofVirtual().start(task)`. Millions of concurrent threads.",
        ],
      },
      {
        heading: "Concurrent Collections",
        points: [
          "**ConcurrentHashMap** — Segment-level locking. `putIfAbsent()`, `computeIfAbsent()`, `merge()`. No null keys/values.",
          "**CopyOnWriteArrayList** — Creates new copy on write. Thread-safe reads without locking. Best for read-heavy use.",
          "**BlockingQueue** — `put()` blocks if full, `take()` blocks if empty. Producer-consumer pattern.",
          "**Atomic Classes** — `AtomicInteger`, `AtomicLong`, `AtomicReference`. Lock-free thread-safe operations via CAS.",
          "**CountDownLatch / CyclicBarrier** — Coordination. Latch: one-time wait for N events. Barrier: reusable sync point.",
        ],
      },
    ],
  },
  {
    id: "exception-handling",
    title: "Exception Handling",
    topics: [
      {
        heading: "Exception Hierarchy",
        points: [
          "**Throwable** → `Error` (JVM issues, don't catch) and `Exception` (application-level).",
          "**Checked Exceptions** — Must handle at compile time. `IOException`, `SQLException`, `ClassNotFoundException`.",
          "**Unchecked Exceptions** — Runtime exceptions. `NullPointerException`, `ArrayIndexOutOfBoundsException`, `IllegalArgumentException`.",
          "**Error** — `OutOfMemoryError`, `StackOverflowError`. Indicates serious JVM problems. Generally not recoverable.",
        ],
      },
      {
        heading: "Try-Catch-Finally",
        points: [
          "**try-catch** — `try { risky code } catch (SpecificException e) { handle }`. Catch most specific exception first.",
          "**Multi-catch (Java 7+)** — `catch (IOException | SQLException e)`. Single block for multiple exception types.",
          "**finally** — Always executes (even after return). Used for cleanup. Avoid return/throw in finally block.",
          "**try-with-resources (Java 7+)** — `try (var stream = new FileInputStream(f)) { }`. Auto-closes `AutoCloseable` resources.",
        ],
      },
      {
        heading: "Custom Exceptions & Best Practices",
        points: [
          "**Custom Checked** — `class BusinessException extends Exception { }`. For recoverable business errors.",
          "**Custom Unchecked** — `class NotFoundException extends RuntimeException { }`. For programming errors.",
          "**Best Practices** — Never catch generic `Exception`. Always log before re-throwing. Don't use exceptions for flow control.",
          "**Exception Chaining** — `throw new ServiceException(\"msg\", originalException)`. Preserve root cause with `getCause()`.",
        ],
      },
    ],
  },
  {
    id: "jvm-memory",
    title: "JVM & Memory Management",
    topics: [
      {
        heading: "JVM Architecture",
        points: [
          "**Class Loader** — Loading → Linking → Initialization. Bootstrap, Extension, Application class loaders.",
          "**JIT Compiler** — Compiles hot bytecode to native code at runtime. C1 (client) and C2 (server) compilers.",
          "**Bytecode** — `.java` → `javac` → `.class` (bytecode) → JVM interprets/JIT compiles. Platform independent.",
          "**JVM vs JRE vs JDK** — JVM executes bytecode. JRE = JVM + libraries. JDK = JRE + dev tools (compiler, debugger).",
        ],
      },
      {
        heading: "Memory Areas",
        points: [
          "**Heap** — Objects and arrays. Shared across threads. Divided into Young Gen (Eden + Survivor) and Old Gen.",
          "**Stack** — Per thread. Stores method frames, local variables, partial results. LIFO. `StackOverflowError` on overflow.",
          "**Metaspace (Java 8+)** — Stores class metadata. Replaced PermGen. Auto-grows by default.",
          "**String Pool** — Intern pool for string literals. `\"hello\" == \"hello\"` is true. `new String(\"hello\")` creates new object.",
        ],
      },
      {
        heading: "Garbage Collection",
        points: [
          "**GC Basics** — Automatic memory management. Identifies and removes unreachable objects. `System.gc()` is a suggestion only.",
          "**GC Algorithms** — Serial (single thread), Parallel (multi-thread), G1 (default Java 9+), ZGC (low latency Java 15+).",
          "**GC Roots** — Local variables, static fields, active threads, JNI references. Objects reachable from roots are alive.",
          "**Memory Leaks** — Unclosed resources, static collections growing, inner class references, listeners not removed.",
          "**JVM Flags** — `-Xms` (initial heap), `-Xmx` (max heap), `-XX:+UseG1GC`, `-XX:+PrintGCDetails`.",
        ],
      },
    ],
  },
];
