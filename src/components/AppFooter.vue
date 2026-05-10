<template>
  <v-footer class="app-footer px-4 py-2" color="orange">
    <div class="footer-row w-100">
      <div class="footer-left">
        <img
          src="../assets/images/company.png"
          alt="Arkansas' Fun logo"
          height="60"
          width="60"
          class="footer-logo mr-2"
        />
      </div>

      <div class="footer-copy text-body-2 text-center">
        <span itemscope itemtype="https://schema.org/Organization">
          <meta itemprop="name" content="Arkansas' Fun" />
          <meta itemprop="email" content="stephen@Arkansas'fun.org" />
          <meta itemprop="url" content="/" />
          &copy; 2026 Arkansas Fun. All rights reserved.
        </span>
      </div>

      <div
        class="footer-contact text-body-2 text-right"
        itemprop="address"
        itemscope
        itemtype="https://schema.org/PostalAddress"
      >
        <div>
          <span itemprop="addressLocality">Little Rock</span>,
          <span itemprop="addressRegion">AR</span>
        </div>
        <div itemprop="telephone">(501) 297-8756</div>
      </div>
    </div>
  </v-footer>
</template>

<style scoped>
.app-footer {
  color: #000000;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  width: 100%;
  min-height: 20px;
  padding: 6px 0;
  max-height: 60px;
}

.footer-row {
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  white-space: normal;
}

.footer-left,
.footer-copy,
.footer-contact {
  display: flex;
  align-items: center;
  color: #000000;
  line-height: 1;
}

.footer-left {
  flex: 0 0 auto;
}

.footer-copy {
  flex: 1 1 auto;
  justify-content: center;
  text-align: center;
  min-width: 0;
}

.footer-contact {
  flex: 0 0 auto;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  font-size: 0.72rem;
}

.footer-logo {
  flex-shrink: 0;
  width: 65px;
  height: 65px;
}

@media (max-width: 1366px) {
  .footer-row {
    gap: 10px;
  }

  .footer-copy {
    font-size: 0.78rem;
  }
}

@media (max-width: 1024px) {
  .app-footer {
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .footer-row {
    min-height: auto;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .footer-copy {
    order: 3;
    flex: 1 0 100%;
    justify-content: center;
    font-size: 0.72rem;
  }

  .footer-contact {
    order: 2;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    font-size: 0.68rem;
    text-align: center;
  }

  .footer-left {
    order: 1;
  }
}

@media (max-width: 900px) {
  .app-footer {
    min-height: auto;
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .footer-row {
    min-height: auto;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .footer-copy {
    font-size: 0.72rem;
    order: 3;
    flex: 1 0 100%;
    justify-content: center;
  }

  .footer-contact {
    order: 2;
    flex: 0 1 auto;
    font-size: 0.68rem;
    text-align: center;
    align-items: center;
    flex-direction: row;
    gap: 8px;
  }

  .footer-left {
    order: 1;
  }
}

@media (max-width: 600px) {
  .footer-row {
    justify-content: center;
  }

  .footer-copy {
    font-size: 0.68rem;
  }

  .footer-contact {
    font-size: 0.64rem;
    flex-direction: column;
    gap: 2px;
  }
}
</style>
