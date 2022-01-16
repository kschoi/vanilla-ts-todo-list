import { ITodoData } from ".";

export const mockTododData = (): ITodoData[] => [
  {
    id: 1,
    title: "SSG 신입공채 온보딩 프론트엔드 개발 교육 준비",
    completed: false,
  },
  {
    id: 2,
    title: "2022년 연말정산 자료 준비",
    completed: false,
  },
  {
    id: 3,
    title: "상품유닛 좋아요 기능 구현",
    completed: false,
  },
  {
    id: 4,
    title: "이달의 구매 도서 신청",
    completed: true,
  },
];
