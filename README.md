# todo-list with react/typescript

리액트/타입스크립트로 간단한 투두 리스트를 만들어 봅시다.

이 레포를 포크해서 `dev/{자신의 계정명}`으로 작업해주신 뒤 원본 레포에 동일한 브랜치로 PR을 만들어주세요.

e.g.)

`upstream dev/tolluset <- origin dev/tolluset`

라이브러리는 제한이 없고, 스타일링은 추가사항입니다.

자유롭게 참여하고 리뷰해주세요!

api는 하단의 `API 명세`를 참고해주세요.

## 요구사항

- [ ] 투두를 생성할 수 있음
- [ ] 투투 리스틀 보여줄 수 있음
- [ ] 투두를 변경할 수 있음
  - [ ] 내용을 변경할 수 있음
  - [ ] 완료/미완료를 변경할 수 있음
- [ ] 투두를 삭제할 수 있음

## 추가사항

- [ ] 스타일링
- [ ] 테스트
  - [ ] 유닛 테스트
  - [ ] E2E 테스트
    - playwright를 사용하시려면 `npx playwright install` 을 해주세요.
- [ ] 접근성
- [ ] 작업에 대한 코멘트 - markdown 파일을 생성하여 작성하거나 PR에 코멘트 남기기

## 고려할 점

- [ ] 좋은 컴포넌트 구조
- [ ] API 처리에 대한 방식

## 실행방법

```bash
yarn            // 의존성 설치
yarn dev        // 개발 환경
localhost:5173  // 기본 포트
```

## API 명세

`POST api/v1/todos`

- status code: 201

> request

```ts
{
  contents: string,
  isFinished: boolean,
}
```

> response

```json
[
  {
    "id": 1,
    "contents": "컴포넌트 만들기",
    "isFinished": false
  },
  {
    "id": 2,
    "contents": "api 연결하기",
    "isFinished": true
  },
  {
    "id": 3,
    "contents": "리드미 작성",
    "isFinished": false
  }
]
```

- status code: 400

> message

`잘못된 요청입니다.`


---

`GET api/v1/todos`

- status code: 200

> response

```json
[
  {
    "id": 1,
    "contents": "컴포넌트 만들기",
    "isFinished": false
  },
  {
    "id": 2,
    "contents": "api 연결하기",
    "isFinished": true
  },
  {
    "id": 3,
    "contents": "리드미 작성",
    "isFinished": false
  }
]
```

---

`PUT api/v1/todos/:todoId`

- status code: 200

> request

```ts
{
  contents?: string,
  isFinished?: boolean,
}
```

> response

```json
[
  {
    "id": 1,
    "contents": "컴포넌트 만들기",
    "isFinished": false
  },
  {
    "id": 2,
    "contents": "api 연결하기",
    "isFinished": true
  },
  {
    "id": 3,
    "contents": "리드미 작성",
    "isFinished": false
  }
]
```

- status code: 400

> message

`잘못된 요청입니다.`

- status code: 404

> message

`존재하지 않는 투두입니다.`

---

`DELETE api/v1/todos/:todoId`

- status code: 204

none

- status code: 400

> message

`잘못된 요청입니다.`

> message

- status code: 404

`존재하지 않는 투두입니다.`

## javascript를 사용하고 싶은 경우

```text
파일을 `js/jsx`를 사용해주세요.

`index.html` 파일에서 모듈을 불러오는 라인을 아래 처럼 변경해주세요.

```html
-   <script type="module" src="/src/main.tsx"></script>
+   <script type="module" src="/src/main.jsx"></script>
````
