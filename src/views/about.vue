<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card elevation="4" rounded="lg" class="pa-6">
          <v-card-title class="text-h4 font-weight-bold mb-2">
            About Arkansas' Fun
          </v-card-title>

          <v-card-subtitle class="text-subtitle-1 mb-6">
            A friendly outdoor learning guide for curious beginners and
            experienced explorers.
          </v-card-subtitle>

          <v-alert
            type="info"
            variant="tonal"
            class="mb-6"
            density="comfortable"
          >
            Established in 2026 by college students who wanted to make outdoor
            learning easier, friendlier, and more accessible for everyone.
          </v-alert>

          <v-card-text class="text-body-1 about-copy">
            <p>
              Arkansas' Fun was created to make wildlife and outdoor information
              easier to understand and easier to find. If you are new to topics
              like hiking, hunting, fishing, and local wildlife, this site gives
              you a welcoming place to start learning without feeling
              overwhelmed.
            </p>

            <p>
              For people who already spend time outdoors, this website is
              designed to save time by bringing useful details together in one
              place. Instead of searching across many different sources, you can
              quickly find weather, activity ideas, and practical information
              for planning your next trip.
            </p>

            <p>
              Our goal is simple: help more people connect with nature, build
              confidence outdoors, and make smart, informed decisions before
              heading out.
            </p>

            <h3 class="text-h6 mt-6 mb-2">What You Will Find Here</h3>
            <ul>
              <li>
                Beginner-friendly guides to hiking, fishing, hunting, and
                wildlife topics.
              </li>
              <li>
                Weather tools and planning information to help you prepare
                before you go.
              </li>
              <li>
                Quick-reference content for experienced users who want answers
                faster.
              </li>
            </ul>

            <h3 class="text-h6 mt-6 mb-2">Our Values</h3>
            <ul>
              <li>
                Learning first: clear explanations without complicated jargon.
              </li>
              <li>
                Respect for nature: promote responsible, ethical outdoor
                behavior.
              </li>
              <li>
                Community focus: support beginners and seasoned outdoor
                enthusiasts alike.
              </li>
            </ul>

            <h3 class="text-h6 mt-6 mb-2">Who This Helps</h3>
            <p>
              Whether you are a student, a family planning a weekend trip, or a
              longtime outdoors person, Arkansas' Fun is built to help you feel
              informed, prepared, and confident every time you head outside.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts"></script>

<style scoped>
.about-copy p {
  margin-bottom: 1rem;
  line-height: 1.7;
}

.about-copy ul {
  margin: 0 0 1rem 1.25rem;
  padding: 0;
}

.about-copy li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}
</style>
