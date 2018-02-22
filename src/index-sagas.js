import LoginSaga from './login/sagas'
import UserSaga from './users/sagas'

export default function* IndexSaga() {
  yield [LoginSaga(), UserSaga()]
}
