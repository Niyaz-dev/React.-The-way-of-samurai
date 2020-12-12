import {follow} from "./users-reducer";
import {usersAPI} from "../api/users-api";
import {APIResponseType, ResultCodesEnum} from "../api/api";

jest.mock("./../api/users-api");
const userApiMock = usersAPI as jest.Mocked<typeof usersAPI>

const result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    data: {},
    messages: []
};

userApiMock.follow.mockReturnValue(Promise.resolve(result));

test("", async () => {
   const thunk = follow(1);
   const dispatchMock = jest.fn();
   
   // @ts-ignore
    await thunk(dispatchMock);
    
    expect(dispatchMock).toBeCalledTimes(3)
}); 