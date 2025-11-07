import { AIPersonality, PrivacySettings } from "./types";

export const defaultAIPersonality: AIPersonality = {
  tone: "friendly",
  formality_level: 5,
  custom_instructions: "Have a friendly and warm conversation!",
  response_length: "balanced",
};

export const defaultPrivacySettings : PrivacySettings = {
    is_public: false,
    visibility: "private", 
    shareable_link_enabled: false,
    // no password yet
    // no allowed domains yet
}