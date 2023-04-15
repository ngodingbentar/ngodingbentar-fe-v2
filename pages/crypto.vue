<template>
  <div class="base">
    <div class="main max-h-screen">
      <div class="section-side items-center justify-center text-center">
        <!-- <div class="icon">
          <img src="/cripto/icon.png"/>
        </div> -->
        <div class="mt-8">
          <nuxt-link to="/">
            <img class="icon" src="/cripto/icon.png">
          </nuxt-link>
        </div>
        <ul class="mt-16">
          <li>
            <nuxt-link to="#">
              <img class="m-auto" src="/cripto/icon-home.png">
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="#">
              <img class="m-auto" src="/cripto/icon-wallet.png">
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="#">
              <img class="m-auto" src="/cripto/icon-chart.png">
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="#">
              <img class="m-auto" src="/cripto/icon-cube.png">
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="#">
              <img class="m-auto" src="/cripto/icon-profile.png">
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="section-main overflow-y-scroll max-h-screen">
        <div class="head text-3xl justify-between flex">
          <div class="font-bold">
            Overview
          </div>
          <div class="flex">
            <nuxt-link to="#" class="circle">
              <div class="btn-rounded">
                <font-awesome-icon :icon="['fas', 'search']" />
              </div>
            </nuxt-link>
            <nuxt-link to="#" class="circle">
              <div class="btn-rounded">
                <font-awesome-icon :icon="['far', 'bell']" />
              </div>
            </nuxt-link>
            <nuxt-link to="#" class="user">
              <div class="btn-rounded">
                <font-awesome-icon :icon="['fas', 'user-circle']" />
              </div>
              <h1 class="mx-2">
                DewaQin
              </h1>
            </nuxt-link>
          </div>
        </div>
        <div class="part-one content flex pt-8">
          <div class="one-left">
            <div class="port-head">
              Portofolio
            </div>
            <div class="py-4">
              <div class="portfolio-card ">
                <div class="pl-6 pt-6">
                  <h1 class="font-bold text-xl ">
                    $ 17 643.41
                  </h1>
                  <p>Portfolio balance</p>
                </div>
              </div>
            </div>
          </div>
          <div class="one-right">
            <div class="flex justify-between">
              <div class="port-head">
                <h1>Your Assets</h1>
              </div>
              <div>
                <nuxt-link to="#">
                  <font-awesome-icon :icon="['fas', 'sliders-h']" />
                </nuxt-link>
              </div>
            </div>
            <div class="flex">
              <div class="asset-content">
                <div class="asset-card btc">
                  <div class="flex justify-between">
                    <p class="font-bold text-xl">
                      1.25 BTC
                    </p>
                    <nuxt-link to="#">
                      <font-awesome-icon class="mt-2" :icon="['fas', 'ellipsis-v']" />
                    </nuxt-link>
                  </div>
                  <p>$ 2948.04</p>
                  <div class="asset-coin">
                    <img src="/cripto/btc.png">
                    <p>+ 0.14%</p>
                  </div>
                </div>
              </div>
              <div class="asset-content">
                <div class="asset-card btc ltc">
                  <div class="flex justify-between">
                    <p class="font-bold text-xl">
                      1.25 BTC
                    </p>
                    <nuxt-link to="#">
                      <font-awesome-icon class="mt-2" :icon="['fas', 'ellipsis-v']" />
                    </nuxt-link>
                  </div>
                  <p>$ 2948.04</p>
                  <div class="asset-coin">
                    <img src="/cripto/btc.png">
                    <p>+ 0.14%</p>
                  </div>
                </div>
              </div>
              <div class="asset-content">
                <div class="asset-card eth">
                  <div class="flex justify-between">
                    <p class="font-bold text-xl">
                      1.25 BTC
                    </p>
                    <nuxt-link to="#">
                      <font-awesome-icon class="mt-2" :icon="['fas', 'ellipsis-v']" />
                    </nuxt-link>
                  </div>
                  <p>$ 2948.04</p>
                  <div class="asset-coin">
                    <img src="/cripto/btc.png">
                    <p>+ 0.14%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="part-two mt-8 flex">
          <div class="two-left">
            <div class="market-head flex justify-between pr-4">
              <div class="text-2xl font-bold">
                Market is down 0.80%
              </div>
              <div class="flex">
                <div class="time">
                  <!-- <h1 class="mx-2">24h</h1> -->
                  <select id="cars" name="cars" class="focus:outline-none">
                    <option value="volvo">
                      24H
                    </option>
                    <option value="saab">
                      1Day
                    </option>
                    <option value="mercedes">
                      1M
                    </option>
                    <option value="audi">
                      1Y
                    </option>
                  </select>
                  <!-- <font-awesome-icon :icon="['fas', 'chevron-down']" /> -->
                </div>
                <div class="time">
                  <!-- <h1 class="mx-2">Top gainers</h1>
                  <font-awesome-icon :icon="['fas', 'chevron-down']" /> -->
                  <select id="top" name="top" class="focus:outline-none">
                    <option value="topgainer">
                      Top gainers
                    </option>
                    <option value="saab">
                      A
                    </option>
                    <option value="mercedes">
                      B
                    </option>
                    <option value="audi">
                      C
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="mt-8">
              <table style="width:100%">
                <tr class="text-left">
                  <th>Name</th>
                  <th>Proce</th>
                  <th>Chanee</th>
                  <th>Market Cap</th>
                  <th class="text-center">
                    Watch
                  </th>
                </tr>
                <tr class="font-bold">
                  <td class="flex">
                    <div>
                      <img src="/cripto/band.png">
                    </div>
                    <div class="ml-2">
                      <div>Band Protocol</div>
                      <div class="font-normal ">
                        BAND
                      </div>
                    </div>
                  </td>
                  <td>$2.42</td>
                  <td class="chanee">
                    +13.38%
                  </td>
                  <td>$399.8M</td>
                  <td class="text-center">
                    <font-awesome-icon :icon="['far', 'star']" />
                  </td>
                </tr>
                <tr class="font-bold">
                  <td class="flex">
                    <div>
                      <img src="/cripto/ve.png">
                    </div>
                    <div class="ml-2">
                      <div>VeChain</div>
                      <div class="font-normal">
                        VET
                      </div>
                    </div>
                  </td>
                  <td>$7.48</td>
                  <td class="chanee">
                    +11.19%
                  </td>
                  <td>$152.5M</td>
                  <td class="text-center">
                    <font-awesome-icon :icon="['far', 'star']" />
                  </td>
                </tr>
                <tr class="font-bold">
                  <td class="flex">
                    <div>
                      <img src="/cripto/aeve.png">
                    </div>
                    <div class="ml-2">
                      <div>Aave</div>
                      <div class="font-normal ">
                        AAVE
                      </div>
                    </div>
                  </td>
                  <td>$0.0184</td>
                  <td class="chanee">
                    +7.57%
                  </td>
                  <td>$1.2B</td>
                  <td class="text-center">
                    <font-awesome-icon :icon="['far', 'star']" />
                  </td>
                </tr>
                <tr class="font-bold">
                  <td class="flex">
                    <div>
                      <img src="/cripto/waves.png">
                    </div>
                    <div class="ml-2">
                      <div>Waves</div>
                      <div class="font-normal">
                        WAVES
                      </div>
                    </div>
                  </td>
                  <td>$30.68</td>
                  <td class="chanee">
                    +6.80%
                  </td>
                  <td>$399.8M</td>
                  <td class="text-center">
                    <font-awesome-icon :icon="['far', 'star']" />
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div class="two-right">
            <div class="two-right-card">
              <div class="flex items-center font-bold ">
                Earn
                <img src="/cripto/free.png">
                crypto
              </div>
              <div class="font-bold">
                with Coinview Earn!
              </div>
              <div class="py-4 text-lg">
                Learn about different cryptocurrencies and earn them for free!
              </div>
              <div class="pt-6 pb-4">
                <button class="btn-earn bg-bluec text-xl text-black font-bold px-6 py-2 rounded-2xl ">
                  Earn now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
::-webkit-scrollbar {
    width: 0;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
}
ul li{
  @apply my-16;
}
.icon {
  background: #F6F0D8;
  @apply m-auto p-3 rounded-2xl;
}
th {
  padding-top:10px;
  padding-bottom:10px;
}
td {
  padding-top:10px;
  padding-bottom:10px;
}
.port-head {
  @apply font-bold text-2xl;
}
.chanee {
  color: #4BA582;
}
.one-left {
  @apply w-1/3;
}
.one-right {
  @apply w-2/3 pl-8;
}
.two-left {
  width: 65%;
}
.two-right {
  @apply p-4 text-white;
  width: 35%;
}
.two-right-card {
  @apply bg-black rounded-2xl px-8 py-10 text-3xl;
}
.btn-earn {
  background: #BCDFFF;
}
.asset-coin {
  @apply mt-16 flex justify-between;
}
.asset-content {
  @apply w-1/3 p-4;
  .btc {
    background: #E5DEF0;
  }
  .ltc {
    background: #D6EDDA;
  }
  .eth {
    background: #F6F0D8;
  }
}
.asset-card {
  @apply p-4 rounded-2xl h-56;
  /* height: 220px; */
}
.user {
  @apply flex items-center shadow-md px-4 rounded-full mx-2;
  background: #F2F5FA;
  font-size: 18px;
  place-items: center;
  text-align: center;
}

.time {
  @apply flex items-center border px-4 rounded-full mx-2;
  font-size: 18px;
  place-items: center;
  text-align: center;
}

.circle {
  @apply rounded-full flex items-center shadow-md mx-2;
  background: #F2F5FA;
  padding: 8px;
  font-size: 18px;
  place-items: center;
  text-align: center;
}
.btn-rounded {
  @apply items-center justify-center flex;
  width: 25px;
  height: 25px;
}
.kotak{
  width: 22px;
  height: 22px;
}
.icon-search{
  /* font-size: 12px; */
  width: 20px;
  height: 20px;
}
.base{
  /* @apply px-8 py-4 min-h-screen max-h-screen bg-gray-100; */
  @apply px-4 min-h-screen max-h-screen;
}

.main {
  @apply flex p-2 bg-black rounded-xl;
}

.section-side {
  @apply text-center bg-black text-white;
  width: 7%;
}

.section-main {
  @apply w-full rounded-xl bg-white p-6;
}

.portfolio-card {
  background: #E5F2FE;
  /* height: 220px; */
  /* background: url('/cripto/bg.png');
  background-size: full; */
  @apply rounded-2xl h-56;
}

@media only screen and (max-width: 1100px) {
  .two-right-card {
    @apply bg-black rounded-2xl px-6 py-10 text-2xl;
  }
}
</style>
