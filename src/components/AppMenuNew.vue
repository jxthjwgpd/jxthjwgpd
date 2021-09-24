<script>
import {
  QExpansionItem,
  QItem,
  QItemSection,
  QIcon,
  QBadge,
  QList,
  QTooltip
} from 'quasar'
// import Menu from '../assets/menu.js'
export default {
  name: 'AppMenuNew',

  props: {
    value: Boolean,
    menuData: {
      default: () => {}, type: Array
    }
  },

  watch: {
    $route (route) {
      this.showMenu(this.$refs[route.path])
    }
  },

  methods: {
    showMenu (comp) {
      if (comp !== void 0 && comp !== this) {
        this.showMenu(comp.$parent)
        comp.show !== void 0 && comp.show()
      }
    },

    getDrawerMenu (h, menu, path, level) {
      if (menu.children !== void 0) {
        return h(
          QExpansionItem,
          {
            staticClass: 'non-selectable',
            ref: path,
            key: `${menu.name}-${path}`,
            props: {
              label: menu.name,
              dense: level > 0,
              icon: menu.icon,
              defaultOpened: menu.opened,
              expandSeparator: true,
              switchToggleSide: level > 0,
              denseToggle: level > 0
            }
          },
          menu.children.map(item => this.getDrawerMenu(
            h,
            item,
            path + (item.path !== void 0 ? '/' + item.path : ''),
            level + 0.65
          ))
        )
      }

      const props = {
        to: path,
        dense: level > 0,
        insetLevel: level > 0.65 ? 0.8 : level
      }

      const attrs = {}

      if (menu.external === true) {
        Object.assign(props, {
          to: void 0,
          clickable: true,
          tag: 'a'
        })

        attrs.href = menu.path
        attrs.target = '_blank'
      }
      if (!this.value) {
        props.insetLevel = 0
      }
      return h(QItem, {
        ref: path,
        key: path,
        props,
        attrs,
        staticClass: 'app-menu-entry non-selectable'
      }, [
        menu.icon !== void 0
          ? h(QItemSection, {
            props: { avatar: true }
          }, [ h(QIcon, { props: { name: menu.icon } }, (!this.value) ? [ h(QTooltip, { props: { anchor: 'center right', self: 'center left', offset: [25, 25] } }, [ menu.name ]) ] : null) ])
          : (!this.value) ? h(QItemSection, {
            props: { avatar: true }
          }, [ h(QIcon, { props: { name: 'select_all', color: 'blue-6' } }, [ h(QTooltip, { props: { anchor: 'center right', self: 'center left', offset: [25, 25] } }, [ menu.name ]) ]) ]) : null,

        h(QItemSection, [ menu.name ]),

        menu.badge !== void 0
          ? h(QItemSection, {
            props: { side: true }
          }, [ h(QBadge, [ menu.badge ]) ])
          : null
      ])
    }
  },

  render (h) {
    if (this.menuData) {
      return h(QList, { staticClass: this.value ? 'app-menu' : 'app-menu minimize' }, this.menuData.map(
        item => this.getDrawerMenu(h, item, '/' + item.path, 0)
      ))
    }
    return null
  },

  mounted () {
    this.showMenu(this.$refs[this.$route.path])
  }
}
</script>

<style lang="sass">
.app-menu

  .q-item__section--avatar
    color: $primary
    min-width: 2px

  .q-item__section--side
    & > .q-icon
      font-size: 20px

  .q-expansion-item--expanded > div > .q-item > .q-item__section--main
    color: $primary
    font-weight: 700

  .q-expansion-item__content .q-item
    border-radius: 0
    margin-right: 0
    &--dense
      min-height: 38px

  .q-item.q-router-link--active
    background: scale-color($primary, $lightness: 90%)

  &.minimize
    & .q-item__section--main,.q-item__section--side
        display: none
    & .q-item__section--avatar
        display: inherit
    .q-expansion-item__content .q-item
       border-radius: 0
       margin: 0
</style>
