import { rest } from "msw";

type Todo = {
  id: number;
  contents: string;
  isFinished: boolean;
};

let todos: Todo[] = [
  {
    id: 1,
    contents: "컴포넌트 만들기",
    isFinished: false,
  },
  {
    id: 2,
    contents: "api 연결하기",
    isFinished: true,
  },
  {
    id: 3,
    contents: "리드미 작성",
    isFinished: false,
  },
];

type ErrorCode = {
  status: number;
  message: string;
};

const ERROR_CODE = {
  INVALID_REQUEST: {
    status: 400,
    message: "잘못된 요청입니다.",
  },
  NOT_FOUND_TODO: {
    status: 404,
    message: "존재하지 않는 투두입니다.",
  },
};

const notValidatedId = (todoId: unknown) => typeof todoId === "number";
const notValidatedContents = (contents: unknown) =>
  typeof contents === "string";
const notValidatedIsFinished = (isFinished: unknown) =>
  typeof isFinished === "boolean";
const notFoundByTodoId = (todos: Todo[], todoId: number) =>
  todos.find((todo) => todo.id === todoId) === undefined;

const PREFIX = "api";
const VERSION = "v1";
const urls = {
  todos: `${PREFIX}/${VERSION}/todos`,
};

type RequestPostDTO = Omit<Todo, "id">;
type RequestPutDTO = Partial<Omit<Todo, "id">>;

export const todoHandlers = [
  // 투두 추가
  rest.post(urls.todos, async (req, res, ctx) => {
    const data: RequestPostDTO = await req.json();

    if (
      notValidatedContents(data?.contents) ||
      notValidatedIsFinished(data?.isFinished)
    )
      return res(
        ctx.status(
          ERROR_CODE.INVALID_REQUEST.status,
          ERROR_CODE.INVALID_REQUEST.message
        )
      );

    const newTodo = { id: todos.length + 1, ...data };

    todos.push(newTodo);

    return res(ctx.status(201), ctx.json(newTodo));
  }),

  // 투두 목록
  rest.get(urls.todos, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todos));
  }),

  // 투두 변경
  rest.put(`${urls.todos}/:todoId`, async (req, res, ctx) => {
    const { todoId } = req.params;
    const data: RequestPutDTO = await req.json();

    if (
      notValidatedId(todoId) ||
      notValidatedContents(data?.contents) ||
      notValidatedIsFinished(data?.isFinished)
    )
      return res(
        ctx.status(
          ERROR_CODE.INVALID_REQUEST.status,
          ERROR_CODE.INVALID_REQUEST.message
        )
      );

    if (notFoundByTodoId(todos, Number(todoId)))
      return res(
        ctx.status(
          ERROR_CODE.NOT_FOUND_TODO.status,
          ERROR_CODE.NOT_FOUND_TODO.message
        )
      );

    const updatedTodo = {
      id: Number(todoId),
      ...data,
    };

    const updatedTodos: Todo[] = todos.map((todo) =>
      todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
    );

    todos = updatedTodos;

    return res(ctx.status(200), ctx.json(updatedTodo));
  }),

  // 투두 석재
  rest.delete(`${urls.todos}/:todoId`, (req, res, ctx) => {
    const { todoId } = req.params;

    if (notValidatedId(todoId))
      return res(
        ctx.status(
          ERROR_CODE.INVALID_REQUEST.status,
          ERROR_CODE.INVALID_REQUEST.message
        )
      );

    if (notFoundByTodoId(todos, Number(todoId)))
      return res(
        ctx.status(
          ERROR_CODE.NOT_FOUND_TODO.status,
          ERROR_CODE.NOT_FOUND_TODO.message
        )
      );

    const removedTodos: Todo[] = todos.filter(
      (todo) => todo.id !== Number(todoId)
    );

    todos = removedTodos;

    return res(ctx.status(204));
  }),
];
