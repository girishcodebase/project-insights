export const subsections = [
  {
    id: "unit-testing",
    title: "Unit Testing",
    topics: [
      {
        heading: "JUnit 5",
        points: [
          "**Core Annotations** — `@Test`, `@BeforeEach`, `@AfterEach`, `@BeforeAll`, `@AfterAll`. `@DisplayName` for readable test names. `@Disabled` to skip tests.",
          "**Assertions** — `assertEquals`, `assertNotNull`, `assertThrows`, `assertAll` (grouped assertions), `assertTimeout`. Use `assertThat` from AssertJ for fluent API.",
          "**Parameterized Tests** — `@ParameterizedTest` with sources: `@ValueSource`, `@CsvSource`, `@MethodSource`, `@EnumSource`. Run same test with different inputs.",
          "**Nested Tests** — `@Nested` inner classes for hierarchical test organization. Group related tests by scenario or state. Shares setup from outer class.",
          "**Lifecycle** — Test instance per method (default). `@TestInstance(Lifecycle.PER_CLASS)` for shared state. `@TestMethodOrder` controls execution order when needed.",
        ],
      },
      {
        heading: "Mockito",
        points: [
          "**Creating Mocks** — `@Mock` annotation + `@ExtendWith(MockitoExtension.class)`. Or `Mockito.mock(MyService.class)`. Mocks return defaults (null, 0, false).",
          "**Stubbing** — `when(service.findById(1L)).thenReturn(user)`. `thenThrow()` for exceptions. `thenAnswer()` for dynamic responses based on arguments.",
          "**Verification** — `verify(repo).save(any(User.class))`. `verify(repo, times(2)).findAll()`. `verify(repo, never()).delete(any())`. Confirms interactions occurred.",
          "**ArgumentCaptor** — `@Captor ArgumentCaptor<User> captor`. Capture arguments passed to mock methods. `verify(repo).save(captor.capture())` then `captor.getValue()`.",
          "**Spy** — `@Spy` wraps real object. Real methods called unless stubbed. Useful for partial mocking. `doReturn(value).when(spy).method()` syntax required.",
        ],
      },
    ],
  },
  {
    id: "integration-testing",
    title: "Integration Testing",
    topics: [
      {
        heading: "Spring Boot Test",
        points: [
          "**@SpringBootTest** — Loads full application context. Use `webEnvironment = RANDOM_PORT` for server tests. `@AutoConfigureMockMvc` for MockMvc without starting server.",
          "**@WebMvcTest** — Loads only web layer (controllers, filters, advice). Mock service layer with `@MockBean`. Fast, focused controller testing.",
          "**@DataJpaTest** — Configures in-memory database, scans `@Entity` and `@Repository`. Auto-rollback after each test. Use `@AutoConfigureTestDatabase(replace = NONE)` for real DB.",
          "**@MockBean** — Replaces bean in ApplicationContext with Mockito mock. `@SpyBean` wraps existing bean. Scoped to test class. Resets between tests.",
          "**Test Slices** — `@JsonTest` (Jackson), `@RestClientTest` (REST clients), `@JdbcTest` (JDBC). Each loads minimal context for faster execution.",
        ],
      },
      {
        heading: "Testcontainers",
        points: [
          "**Purpose** — Spin up real Docker containers for integration tests. PostgreSQL, MySQL, Kafka, Redis, Elasticsearch. Disposable, consistent test environments.",
          "**PostgreSQL Example** — `@Container static PostgreSQLContainer<?> pg = new PostgreSQLContainer<>(\"postgres:16\")`. Dynamic port, auto-created database.",
          "**@ServiceConnection** — Spring Boot 3.1+. Auto-configures datasource/connection properties from container. Replaces manual `@DynamicPropertySource` setup.",
          "**Reusable Containers** — `.withReuse(true)` keeps containers running between test runs. Add `testcontainers.reuse.enable=true` in `~/.testcontainers.properties`. Faster CI.",
          "**Kafka Testcontainer** — `KafkaContainer` with Confluent image. Test producers, consumers, and stream processing with real Kafka broker in tests.",
        ],
      },
    ],
  },
  {
    id: "best-practices",
    title: "Best Practices",
    topics: [
      {
        heading: "Test Design",
        points: [
          "**Naming Convention** — `shouldReturnUser_whenIdExists()` or `givenValidId_whenFindById_thenReturnUser()`. Test name describes scenario and expected outcome.",
          "**AAA Pattern** — Arrange (setup data and mocks), Act (call method under test), Assert (verify results). Clear separation makes tests readable.",
          "**One Concept Per Test** — Each test verifies one behavior. Multiple assertions are fine if they verify the same concept. Avoids debugging multiple failures at once.",
          "**Test Independence** — Tests should not depend on execution order or shared mutable state. Each test sets up its own data. Use `@BeforeEach` for common setup.",
          "**Avoid Test Smells** — No logic in tests (no if/loops). No testing private methods directly. No test interdependencies. No flaky tests (fix or quarantine).",
        ],
      },
      {
        heading: "Test Pyramid & Coverage",
        points: [
          "**Test Pyramid** — Many unit tests (fast, isolated), fewer integration tests (slower, real dependencies), minimal E2E tests (slowest, full system). Invert = ice cream cone anti-pattern.",
          "**JaCoCo** — Code coverage tool for Java. Maven/Gradle plugin. Generates reports (line, branch, instruction coverage). Set minimum thresholds in build config.",
          "**Mutation Testing** — PIT (PITest) mutates source code and checks if tests catch changes. Measures test quality beyond line coverage. Finds weak assertions.",
          "**Test Data Builders** — Builder pattern for test objects. `TestUserBuilder.aUser().withName(\"John\").build()`. Reduces boilerplate, makes tests readable and maintainable.",
          "**CI Integration** — Run tests on every PR. Fail build on test failure or coverage drop. Publish reports as build artifacts. Separate fast (unit) and slow (integration) pipelines.",
        ],
      },
    ],
  },
];
