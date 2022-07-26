import { setupServer } from "msw/node";
import { rest } from "msw";
import { http } from "network";

const apiUrl = process.env.REACT_APP_API_URL;

const server = setupServer();

// 执行所有测试前所执行的回调
beforeAll(() => server.listen());

// 每一个测试跑完以后都重置mock路由
afterEach(() => server.resetHandlers());

// 所有的测试跑完以后关闭mock路由
afterAll(() => server.close());

test("http方法发送异步请求", async () => {
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "mock" };

  server.use(
    rest.get(`${apiUrl}/${endpoint}`, (req, res, ctx) =>
      res(ctx.json(mockResult)),
    ),
  );

  const result = await http(`/${endpoint}`);
  expect(result).toEqual(mockResult);
});

test("http方法发送会携带token", async () => {
  const token = "test-token";
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "mock" };
  let request: any;
  server.use(
    rest.get(`${apiUrl}/${endpoint}`, (req, res, ctx) => {
      request = req;
      return res(ctx.json(mockResult));
    }),
  );

  await http(`/${endpoint}`, { token });
  expect(request.headers.get("Authorization")).toBe(`Bearer ${token}`);
});
