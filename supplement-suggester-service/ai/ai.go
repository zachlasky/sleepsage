package ai

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"sss/shared"

	"github.com/openai/openai-go"
	"github.com/openai/openai-go/option"
)

func GetOpenAIResponse(interactions []string, symptoms []string) (shared.CleanedSymptomsAndInteractions, error) {
	// Create a new openai client
	client := openai.NewClient(
		option.WithAPIKey(os.Getenv("OPENAI_API_KEY")),
	)

	// Content to send to the chat model
	var content = fmt.Sprintf(`Compare the following:
		My symptoms: %s
		My interactions: %s
		User symptoms: %s
		User interactions: %s
		Task: Find similarities between user symptoms/interactions and my symptoms/interactions. Consider synonyms or similar phrases. For example, recognize that "feeling lightheaded" is related to "dizziness," and both should be treated as a match. Return only my symptoms and interactions that match or are similar to the user's input.
		Output format: { "Symptoms": [], "Interactions": [] }
	`, shared.Symptoms, shared.Interactions, symptoms, interactions)

	// Call the chat model
	chatCompletion, err := client.Chat.Completions.New(context.TODO(), openai.ChatCompletionNewParams{
		Messages: openai.F([]openai.ChatCompletionMessageParamUnion{
			openai.UserMessage(content),
		}),
		Model:     openai.F(openai.ChatModelGPT3_5Turbo), // Use the GPT-3.5-turbo model
		MaxTokens: openai.F(int64(200)),                  // Limit the number of tokens to 200
	})
	if err != nil {
		return shared.CleanedSymptomsAndInteractions{}, err
	}

	// Get the output from the chat model
	output := chatCompletion.Choices[0].Message.Content

	// Parse the JSON output
	var cleanedSymptomsAndInteractions shared.CleanedSymptomsAndInteractions
	err = json.Unmarshal([]byte(output), &cleanedSymptomsAndInteractions)
	if err != nil {
		return shared.CleanedSymptomsAndInteractions{}, err
	}

	// Return the cleaned data
	return shared.CleanedSymptomsAndInteractions{
		Symptoms:     cleanedSymptomsAndInteractions.Symptoms,
		Interactions: cleanedSymptomsAndInteractions.Interactions,
	}, nil
}
