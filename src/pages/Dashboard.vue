<template>
  <q-page class="my-page ">
    <div class="row items-center justify-between">
      <div class="my-page-header">
        <q-breadcrumbs align="left">
          <q-breadcrumbs-el
            label="首页"
            to="/"
          />
          <q-breadcrumbs-el label="控制台总览" />
        </q-breadcrumbs>
        <div class="my-page-header-subtitle">中枢分析数据概览</div>
      </div>
    </div>
    <div class="my-page-body">

      <q-banner
        dense
        inline-actions
        class="q-mb-md bg-amber-1"
      >
        云服务器ECS主机管理，精简效果上线，邀请你参与问卷调查。
        <template v-slot:action>
          <q-btn
            flat
            label="不参与"
          />
          <q-btn
            flat
            label="前往填写"
            color="primary"
          />
        </template>
      </q-banner>
      <div class="row">
        <div class="col-md-8 col-12">
          <q-card flat>
            <q-card-section>
              <div class="row no-wrap items-center">
                <div class="col text-subtitle2 ellipsis">
                  我的资源
                </div>
                <div class="col-auto text-grey text-caption row no-wrap items-center">
                  总量（128G）
                </div>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-linear-progress
                size="25px"
                :value="progress1"
                color="accent"
              >
                <div class="absolute-full flex flex-center">
                  <q-badge
                    color="white"
                    text-color="accent"
                    :label="progressLabel1"
                  />
                </div>
              </q-linear-progress>
            </q-card-section>

            <q-separator />
            <q-card-section class="text-subitle2">
              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                  <q-card
                    flat
                    class="bg-secondary text-white"
                  >
                    <q-card-section>
                      <div class="text-h6 row no-wrap items-center">
                        <div class="ellipsis text-capitalize">secondary</div>
                        <div class="q-space"></div>
                      </div>
                    </q-card-section>
                    <q-card-section>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    </q-card-section>
                  </q-card>
                </div>
                <div class="col-12 col-sm-6 col-md-4 col-lg-3">

                  <q-card
                    flat
                    class="bg-dark text-white"
                  >
                    <q-card-section>
                      <div class="text-h6 row no-wrap items-center">
                        <div class="ellipsis text-capitalize">dark</div>
                        <div class="q-space"></div>
                      </div>
                    </q-card-section>
                    <q-card-section>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    </q-card-section>
                  </q-card>
                </div>
                <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                  <div class="q-card q-card--flat no-shadow bg-positive text-white">
                    <div class="q-card__section q-card__section--vert">
                      <div class="text-h6 row no-wrap items-center">
                        <div class="ellipsis text-capitalize">positive</div>
                        <div class="q-space"></div><svg
                          aria-hidden="true"
                          role="presentation"
                          focusable="false"
                          viewBox="0 0 24 24"
                          class="q-icon notranslate"
                          style="font-size: 24px;"
                        >
                          <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"></path>
                        </svg>
                      </div>
                    </div>
                    <div class="q-card__section q-card__section--vert">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
                  </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                  <div class="q-card q-card--flat no-shadow bg-negative text-white">
                    <div class="q-card__section q-card__section--vert">
                      <div class="text-h6 row no-wrap items-center">
                        <div class="ellipsis text-capitalize">negative</div>
                        <div class="q-space"></div><svg
                          aria-hidden="true"
                          role="presentation"
                          focusable="false"
                          viewBox="0 0 24 24"
                          class="q-icon notranslate"
                          style="font-size: 24px;"
                        >
                          <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z"></path>
                        </svg>
                      </div>
                    </div>
                    <div class="q-card__section q-card__section--vert">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
                  </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                  <div class="q-card q-card--flat no-shadow bg-info text-black">
                    <div class="q-card__section q-card__section--vert">
                      <div class="text-h6 row no-wrap items-center">
                        <div class="ellipsis text-capitalize">info</div>
                        <div class="q-space"></div><svg
                          aria-hidden="true"
                          role="presentation"
                          focusable="false"
                          viewBox="0 0 24 24"
                          class="q-icon notranslate"
                          style="font-size: 24px;"
                        >
                          <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"></path>
                        </svg>
                      </div>
                    </div>
                    <div class="q-card__section q-card__section--vert">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
                  </div>
                </div>
                <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                  <div class="q-card q-card--flat no-shadow bg-warning text-black">
                    <div class="q-card__section q-card__section--vert">
                      <div class="text-h6 row no-wrap items-center">
                        <div class="ellipsis text-capitalize">warning</div>
                        <div class="q-space"></div><svg
                          aria-hidden="true"
                          role="presentation"
                          focusable="false"
                          viewBox="0 0 24 24"
                          class="q-icon notranslate"
                          style="font-size: 24px;"
                        >
                          <path d="M 11,4L 13,4L 13,15L 11,15L 11,4 Z M 13,18L 13,20L 11,20L 11,18L 13,18 Z"></path>
                        </svg>
                      </div>
                    </div>
                    <div class="q-card__section q-card__section--vert">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
          <q-card
            flat
            class="q-mt-md"
          >
            <q-card-section>
              <div
                id="demoChart2"
                style="widht:100%; height:300px"
              ></div>
            </q-card-section>
          </q-card>
          <q-card
            flat
            class="q-mt-md"
          >
            <q-card-section>
              <div
                id="demoChart1"
                style="widht:100%; height:300px"
              ></div>
            </q-card-section>
          </q-card>
          <q-card
            flat
            class="q-mt-md"
          >
            <q-card-section>
              <div class="row no-wrap items-center">
                <div class="col text-subtitle2 ellipsis">
                  严选推荐
                </div>
                <div class="col-auto text-grey text-caption row no-wrap items-center">
                  20-02-01
                </div>
              </div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-list>
                <q-item>
                  <q-item-section
                    avatar
                    top
                  >
                    <q-icon
                      name="account_tree"
                      color="black"
                      size="34px"
                    />
                  </q-item-section>

                  <q-item-section
                    top
                    class="col-2 gt-sm"
                  >
                    <q-item-label class="q-mt-sm">GitHub</q-item-label>
                  </q-item-section>

                  <q-item-section top>
                    <q-item-label lines="1">
                      <span class="text-weight-medium">[quasarframework/quasar]</span>
                      <span class="text-grey-8"> - GitHub repository</span>
                    </q-item-label>
                    <q-item-label
                      caption
                      lines="1"
                    >
                      @rstoenescu in #3: > Generic type parameter for props
                    </q-item-label>
                    <q-item-label
                      lines="1"
                      class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase"
                    >
                      <span class="cursor-pointer">Open in GitHub</span>
                    </q-item-label>
                  </q-item-section>

                  <q-item-section
                    top
                    side
                  >
                    <div class="text-grey-8 q-gutter-xs">
                      <q-btn
                        class="gt-xs"
                        size="12px"
                        flat
                        dense
                        round
                        icon="delete"
                      />
                      <q-btn
                        class="gt-xs"
                        size="12px"
                        flat
                        dense
                        round
                        icon="done"
                      />
                      <q-btn
                        size="12px"
                        flat
                        dense
                        round
                        icon="more_vert"
                      />
                    </div>
                  </q-item-section>
                </q-item>

                <q-separator spaced />

                <q-item>
                  <q-item-section
                    avatar
                    top
                  >
                    <q-icon
                      name="account_tree"
                      color="black"
                      size="34px"
                    />
                  </q-item-section>

                  <q-item-section
                    top
                    class="col-2 gt-sm"
                  >
                    <q-item-label class="q-mt-sm">GitHub</q-item-label>
                  </q-item-section>

                  <q-item-section top>
                    <q-item-label lines="1">
                      <span class="text-weight-medium">[quasarframework/quasar]</span>
                      <span class="text-grey-8"> - GitHub repository</span>
                    </q-item-label>
                    <q-item-label
                      caption
                      lines="1"
                    >
                      @rstoenescu in #1: > The build system
                    </q-item-label>
                    <q-item-label
                      lines="1"
                      class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase"
                    >
                      <span class="cursor-pointer">Open in GitHub</span>
                    </q-item-label>
                  </q-item-section>

                  <q-item-section
                    top
                    side
                  >
                    <div class="text-grey-8 q-gutter-xs">
                      <q-btn
                        class="gt-xs"
                        size="12px"
                        flat
                        dense
                        round
                        icon="delete"
                      />
                      <q-btn
                        class="gt-xs"
                        size="12px"
                        flat
                        dense
                        round
                        icon="done"
                      />
                      <q-btn
                        size="12px"
                        flat
                        dense
                        round
                        icon="more_vert"
                      />
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>

          </q-card>
          <q-card
            flat
            class="q-mt-md"
          >
            <q-card-section>
              <q-markup-table flat>
                <thead>
                  <tr>
                    <th class="text-left">Dessert (100g serving)</th>
                    <th class="text-right">Calories</th>
                    <th class="text-right">Fat (g)</th>
                    <th class="text-right">Carbs (g)</th>
                    <th class="text-right">Protein (g)</th>
                    <th class="text-right">Sodium (mg)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-left">Frozen Yogurt</td>
                    <td class="text-right">159</td>
                    <td class="text-right">6</td>
                    <td class="text-right">24</td>
                    <td class="text-right">4</td>
                    <td class="text-right">87</td>
                  </tr>
                  <tr>
                    <td class="text-left">Ice cream sandwich</td>
                    <td class="text-right">237</td>
                    <td class="text-right">9</td>
                    <td class="text-right">37</td>
                    <td class="text-right">4.3</td>
                    <td class="text-right">129</td>
                  </tr>
                  <tr>
                    <td class="text-left">Eclair</td>
                    <td class="text-right">262</td>
                    <td class="text-right">16</td>
                    <td class="text-right">23</td>
                    <td class="text-right">6</td>
                    <td class="text-right">337</td>
                  </tr>
                  <tr>
                    <td class="text-left">Cupcake</td>
                    <td class="text-right">305</td>
                    <td class="text-right">3.7</td>
                    <td class="text-right">67</td>
                    <td class="text-right">4.3</td>
                    <td class="text-right">413</td>
                  </tr>
                  <tr>
                    <td class="text-left">Gingerbread</td>
                    <td class="text-right">356</td>
                    <td class="text-right">16</td>
                    <td class="text-right">49</td>
                    <td class="text-right">3.9</td>
                    <td class="text-right">327</td>
                  </tr>
                </tbody>
              </q-markup-table>
            </q-card-section>
          </q-card>

        </div>
        <div :class="`col-md-4 col-12 ${$q.screen.gt.sm?'q-pl-md':'q-mt-md'}`">
          <q-card flat>
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-overline">Overline</div>
                <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
                <div class="text-caption text-grey">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
              </q-card-section>

              <q-card-section class="col-5 flex flex-center">
                <q-img
                  class="rounded-borders"
                  src="https://cdn.quasar.dev/img/parallax2.jpg"
                />
              </q-card-section>
            </q-card-section>

            <q-separator />

            <q-card-actions>
              <q-btn
                flat
                round
                icon="event"
              />
              <q-btn flat>
                7:30PM
              </q-btn>
              <q-btn
                flat
                color="primary"
              >
                Reserve
              </q-btn>
            </q-card-actions>
          </q-card>
          <q-card
            flat
            class="q-mt-md"
          >

            <q-card-section class="q-pa-none">
              <q-date
                v-model="date"
                flat
                :events="events"
                :event-color="(date) => date[9] % 2 === 0 ? 'teal' : 'orange'"
                style="width:100%"
              />
            </q-card-section>

          </q-card>
          <q-card
            flat
            class="q-mt-md"
          >
            <q-card-section>
              <div class="row no-wrap items-center">
                <div class="col text-subtitle2 ellipsis">
                  推广
                </div>
                <div class="col-auto text-primary text-caption row no-wrap items-center">
                  更多
                </div>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-carousel
                v-model="slide"
                transition-prev="scale"
                transition-next="scale"
                swipeable
                animated
                control-color="white"
                padding
                height="150px"
                class="bg-primary text-white shadow-1 rounded-borders"
              >
                <q-carousel-slide
                  name="style"
                  class="column no-wrap flex-center"
                >
                  <q-icon
                    name="style"
                    size="23px"
                  />
                  <div class="q-mt-md text-center">
                    {{ lorem }}
                  </div>
                </q-carousel-slide>
                <q-carousel-slide
                  name="tv"
                  class="column no-wrap flex-center"
                >
                  <q-icon
                    name="live_tv"
                    size="23px"
                  />
                  <div class="q-mt-md text-center">
                    {{ lorem }}
                  </div>
                </q-carousel-slide>
                <q-carousel-slide
                  name="layers"
                  class="column no-wrap flex-center"
                >
                  <q-icon
                    name="layers"
                    size="23px"
                  />
                  <div class="q-mt-md text-center">
                    {{ lorem }}
                  </div>
                </q-carousel-slide>
                <q-carousel-slide
                  name="map"
                  class="column no-wrap flex-center"
                >
                  <q-icon
                    name="terrain"
                    size="23px"
                  />
                  <div class="q-mt-md text-center">
                    {{ lorem }}
                  </div>
                </q-carousel-slide>
              </q-carousel>

            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
  <!-- </template>

    </q-splitter>
  </q-page> -->
</template>

<script>
import { Chart, registerShape } from '@antv/g2'
import { Line } from '@antv/g2plot'
import DataSet from '@antv/data-set'
import { isEmpty } from 'lodash'
export default {
  data () {
    return {
      progress1: 0.3,
      date: '2019/02/01',
      events: ['2019/02/01', '2019/02/05', '2019/02/06', '2019/02/09', '2019/02/23'],
      expanded: true,
      slide: 'style',
      lorem: 'Lorem ipsum dolor. '
    }
  },
  created () {
    this.splitterWatch(this.$q.screen.gt.sm)
  },
  computed: {
    progressLabel1 () {
      return (this.progress1 * 100).toFixed(2) + '%'
    }
  },
  mounted () {
    registerShape('polygon', 'boundary-polygon', {
      draw (cfg, container) {
        if (!isEmpty(cfg.points)) {
          const group = container.addGroup()
          const attrs = {
            stroke: '#fff',
            lineWidth: 1,
            fill: cfg.color
          }
          const points = cfg.points
          const path = [
            ['M', points[0].x, points[0].y],
            ['L', points[1].x, points[1].y],
            ['L', points[2].x, points[2].y],
            ['L', points[3].x, points[3].y],
            ['Z']
          ]
          attrs.path = this.parsePath(path)
          group.addShape('path', {
            attrs
          })

          // if (cfg.data.lastWeek) {
          //   const linePath = [
          //     ['M', points[2].x, points[2].y],
          //     ['L', points[3].x, points[3].y]
          //   ]
          //   // 最后一周的多边形添加右侧边框
          //   group.addShape('path', {
          //     attrs: {
          //       path: this.parsePath(linePath),
          //       lineWidth: 4,
          //       stroke: '#404040'
          //     }
          //   })
          //   if (cfg.data.lastDay) {
          //     group.addShape('path', {
          //       attrs: {
          //         path: this.parsePath([
          //           ['M', points[1].x, points[1].y],
          //           ['L', points[2].x, points[2].y]
          //         ]),
          //         lineWidth: 4,
          //         stroke: '#404040'
          //       }
          //     })
          //   }
          // }

          return group
        }
      }
    })

    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/github-commit.json')
      .then(res => res.json())
      .then(data => {
        const chart = new Chart({
          container: 'demoChart2',
          autoFit: true
        })
        chart.data(data)
        chart.scale({
          day: {
            type: 'cat',
            values: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
          },
          week: {
            type: 'cat'
          },
          commits: {
            sync: true
          },
          date: {
            type: 'cat'
          }
        })

        chart.axis('week', {
          position: 'top',
          tickLine: null,
          line: null,
          label: {
            offset: 12,
            style: {
              fontSize: 12,
              fill: '#666',
              textBaseline: 'top'
            },
            formatter: val => {
              if (val === '2') {
                return 'MAY'
              } else if (val === '6') {
                return 'JUN'
              } else if (val === '10') {
                return 'JUL'
              } else if (val === '15') {
                return 'AUG'
              } else if (val === '19') {
                return 'SEP'
              } else if (val === '24') {
                return 'OCT'
              }
              return ''
            }
          }
        })
        chart.axis('day', {
          grid: null
        })
        chart.legend(false)
        chart.tooltip({
          title: 'date',
          showMarkers: false
        })
        chart.coordinate().reflect('y')
        chart.polygon().position('week*day*date')
          .color('commits', '#BAE7FF-#1890FF-#0050B3')
          .shape('boundary-polygon')

        chart.interaction('element-active')

        chart.render()
      })

    fetch('https://gw.alipayobjects.com/os/bmw-prod/49a2fe69-ae03-4799-88e2-55c096a54d45.json')
      .then((res) => res.json())
      .then((originalData) => {
        const color = ['#1976D2', '#26A69A', '#21BA45', '#F2C037', '#9C27B0', '#1D1D1D']
        const colorMap = {
          code: color[0],
          code_去年同期: color[1],
          code_上月同期: color[2],
          code_上周同期: color[3]
        }
        const markerMap = {
          code: 'circle',
          code_去年同期: 'circle',
          code_上月同期: 'square',
          code_上周同期: 'triangle'
        }
        const dv = new DataSet().createView().source(originalData)
        dv.transform({
          type: 'fold',
          fields: ['code', 'code_去年同期', 'code_上月同期', 'code_上周同期'], // 展开字段集
          key: 'type', // key字段
          value: 'value' // value字段
        })
        const line = new Line('demoChart1', {
          data: dv.rows,
          padding: 'auto',
          xField: 'date',
          yField: 'value',
          seriesField: 'type',
          color,
          meta: {
            value: {
              formatter: (v) => `${(v / 10000).toFixed(2)} 万`
            },
            type: {
              formatter: (type) => {
                return type === 'code' ? '基础指标' : type.slice(5)
              }
            }
          },
          xAxis: {
            label: {
              autoRotate: false
            }
          },
          yAxis: {
            tickCount: 5,
            label: {
              formatter: (v, item) => `${(Number(item.id) / 10000).toFixed(0)} 万`
            }
          },
          tooltip: {
            showMarkers: false
          },
          point: {
            style: ({ date, value, type }) => {
              const dataIndex = dv.rows.findIndex((r) => r.date === date)
              // every 30 dataPoints show a point, strategy depends by yourself
              if (dataIndex % 30 === 0) {
                return {
                  r: 2,
                  stroke: colorMap[type],
                  fill: type !== 'code' ? colorMap[type] : '#fff'
                }
              }
              return {
                fill: 'transparent',
                stroke: 'transparent',
                lineWidth: 0
              }
            },
            shape: ({ date, value, type }) => {
              return markerMap[type]
            }
          },
          lineStyle: ({ date, value, type }) => {
            if (type === 'code') {
              return {
                lineWidth: 2
              }
            }
            return {
              lineWidth: 1
            }
          },
          interactions: [
            {
              type: 'element-active'
            }
          ]
        })
        line.render()
      })
  },
  watch: {
    '$q.screen.gt.sm' (val) {
      this.splitterWatch(val)
    }
  },
  methods: {
    splitterWatch (val) {
      this.splitterModel = val ? 243 : 0
    },
    eventsFn (date) {
      if (date === '2019/02/01' ||
        date === '2019/02/05' ||
        date === '2019/02/06' ||
        date === '2019/02/09' ||
        date === '2019/02/23') {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="sass">
.ccl-dashboard
  & .q-splitter__before
    background-color: #fff
  & .view-nav-menu
    position: absolute
    top: 0
    bottom: 0
    &-content
      position: absolute
      top: 65px
      left: 0
      right: 0
      bottom: 0
@media (max-width: $breakpoint-sm-max)
  .q-splitter--vertical > .q-splitter__separator
    width: 0px
</style>
