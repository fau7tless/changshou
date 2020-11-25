// 导入路由
import Businesstransfer from '@/router/business/route-transfer'
import Foundationterm from '@/router/foundation/route-term'
import MainTradecash from '@/router/mainTrade/route-cash'
import Business from '@/router/route-business'
import Common from '@/router/route-common'
import Example from '@/router/route-example'
import Foundation from '@/router/route-foundation'
import My from '@/router/route-my'
import PublicPage from '@/router/route-public-page'
import Template from '@/router/route-template'
import Test from '@/router/route-test'
import Trade from '@/router/route-trade'
import Termother from '@/router/term/route-other'

// 路由列表
let routes = []
// 加入routes
Reflect.apply([].push, routes, Businesstransfer)
Reflect.apply([].push, routes, Foundationterm)
Reflect.apply([].push, routes, MainTradecash)
Reflect.apply([].push, routes, Business)
Reflect.apply([].push, routes, Common)
Reflect.apply([].push, routes, Example)
Reflect.apply([].push, routes, Foundation)
Reflect.apply([].push, routes, My)
Reflect.apply([].push, routes, PublicPage)
Reflect.apply([].push, routes, Template)
Reflect.apply([].push, routes, Test)
Reflect.apply([].push, routes, Trade)
Reflect.apply([].push, routes, Termother)

export default routes