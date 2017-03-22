// 按需引入部分组件
import Vue from 'vue'
import { Cell, Checklist, Header , Button , Popup , Field , Navbar , TabItem , TabContainer , TabContainerItem ,  InfiniteScroll , Spinner , Switch , Loadmore } from 'mint-ui'
import 'mint-ui/lib/style.css';

Vue.component(Cell.name, Cell);
Vue.component(Checklist.name, Checklist);
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Popup.name, Popup);
Vue.component(Field.name, Field);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Spinner.name, Spinner);
Vue.component(Switch.name, Switch);
Vue.component(Loadmore.name, Loadmore);
Vue.use(InfiniteScroll);