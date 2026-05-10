<template>
  <v-container class="contact-page py-10">
    <v-row class="contact-row" justify="center" align="start">
      <v-col cols="12" lg="10">
        <v-card class="main-card" rounded="xl" elevation="6">
          <div class="hero px-6 px-md-8 py-6 py-md-7">
            <p class="eyebrow mb-2">Contact</p>
            <h1 class="title mb-2">Contact Arkansas' Fun</h1>
            <p class="subtitle mb-0">
              Questions about wildlife, outdoor activities, or website feedback?
              We would love to hear from you.
            </p>
          </div>

          <v-row class="ma-0 pa-4 pa-md-6" align="stretch">
            <v-col cols="12" md="5">
              <v-card
                class="info-card pa-5"
                rounded="lg"
                elevation="0"
                itemscope
                itemtype="https://schema.org/Organization"
              >
                <meta itemprop="name" content="Arkansas' Fun" />
                <h2 class="text-h6 mb-4">Get In Touch</h2>

                <div class="info-row">
                  <v-icon icon="mdi-email-outline" size="19" class="me-2" />
                  <a
                    class="info-link"
                    href="mailto:stephen@Arkansas'fun.org"
                    itemprop="email"
                  >
                    stephen@Arkansas'fun.org
                  </a>
                </div>
                <div class="info-row">
                  <v-icon icon="mdi-phone-outline" size="19" class="me-2" />
                  <a
                    class="info-link"
                    href="tel:+15012978756"
                    itemprop="telephone"
                  >
                    (501) 297-8756
                  </a>
                </div>
                <div
                  class="info-row mb-4"
                  itemprop="address"
                  itemscope
                  itemtype="https://schema.org/PostalAddress"
                >
                  <v-icon
                    icon="mdi-map-marker-outline"
                    size="19"
                    class="me-2"
                  />
                  <span>
                    <span itemprop="addressLocality">Little Rock</span>,
                    <span itemprop="addressRegion">AR</span>
                  </span>
                </div>

                <v-divider class="mb-4" />

                <h3 class="text-subtitle-1 font-weight-bold mb-2">Hours</h3>
                <p class="mb-1">Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p class="mb-4">Saturday: 10:00 AM - 2:00 PM</p>
              </v-card>
            </v-col>

            <v-col cols="12" md="7">
              <v-card class="form-card pa-5" rounded="lg" elevation="0">
                <h2 class="text-h6 mb-4">Send Us A Message</h2>

                <v-text-field
                  label="Full Name"
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  class="mb-3"
                  color="primary"
                />

                <v-text-field
                  label="Email Address"
                  type="email"
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  class="mb-3"
                  color="primary"
                />

                <v-select
                  label="Topic"
                  :items="contactTopics"
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  class="mb-3"
                  color="primary"
                />

                <v-textarea
                  label="Message"
                  rows="5"
                  variant="outlined"
                  density="comfortable"
                  hide-details="auto"
                  class="mb-4"
                  color="primary"
                />

                <v-btn color="primary" size="large" prepend-icon="mdi-send">
                  Send Message
                </v-btn>
              </v-card>
            </v-col>
          </v-row>

          <div class="px-4 px-md-6 pb-6 pb-md-7">
            <v-alert
              type="info"
              variant="tonal"
              density="comfortable"
              class="bottom-note"
            >
              Typical response time is 1 to 2 business days.
            </v-alert>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const contactTopics = [
  "Wildlife questions",
  "Fishing information",
  "Hiking trails",
  "Hunting resources",
  "Website feedback",
  "Other",
];
</script>

<style scoped>
.contact-page {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: transparent;
  color: #f4f7fb;
}

.contact-row {
  width: 100%;
}

.main-card {
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: transparent;
  color: #f4f7fb;
}

.hero {
  background: #1b2a3d;
  color: #ffffff;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.76rem;
  font-weight: 700;
  opacity: 0.9;
}

.title {
  font-size: clamp(1.6rem, 2.4vw, 2.2rem);
  line-height: 1.2;
}

.subtitle {
  line-height: 1.6;
  max-width: 680px;
}

.info-card,
.form-card {
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  color: #f4f7fb;
  backdrop-filter: blur(8px);
}

.info-row {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
}

.info-link {
  color: inherit;
  text-decoration: none;
}

.info-link:hover {
  text-decoration: underline;
}

.bottom-note {
  background: rgba(81, 118, 190, 0.18);
  color: #ffffff;
}

p {
  line-height: 1.6;
  color: #e4eaf3;
}

:deep(.v-field),
:deep(.v-field__outline),
:deep(.v-field__input),
:deep(.v-label),
:deep(.v-select .v-field),
:deep(.v-textarea .v-field) {
  color: #f4f7fb;
}
</style>
