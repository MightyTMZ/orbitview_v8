from groq import Groq
from decouple import config

groq_api_key = config("GROQ_API_KEY")

if not groq_api_key:
    raise ValueError("Missing GROQ_API_KEY environment variable")

client = Groq(api_key=groq_api_key)

models = [
    'groq/compound-mini',
    'groq/compound',
    'llama-3.1-8b-instant',
    'llama-3.3-70b-versatile',
    'qwen/qwen3-32b',
    'meta-llama/llama-4-maverick-17b-128e-instruct',
    'meta-llama/llama-4-scout-17b-16e-instruct',
    'meta-llama/llama-guard-4-12b',
    'meta-llama/llama-prompt-guard-2-22m',
    'meta-llama/llama-prompt-guard-2-86m',
    'moonshotai/kimi-k2-instruct-0905',
    'openai/gpt-oss-120b',
    'openai/gpt-oss-20b',
    'openai/gpt-oss-safeguard-20b',
]

# choose a model
current_model = models[-3]  # "openai/gpt-oss-20b"
print("Using model:", current_model, "\n")

conversation = []
convo_over = False

while not convo_over:
    message = input("> ")

    # Allow exit
    if message.strip() == "":
        convo_over = True
        break

    # Add user message to conversation history
    conversation.append({"role": "user", "content": message})

    # Build the message list for the API call
    messages_for_llm = [
        {"role": "system", "content": "You are a helpful assistant."},
    ] + conversation

    print("Conversation size: " + str(len(str(conversation))))

    print("ASSISTANT:")

    # Stream the response
    completion = client.chat.completions.create(
        model=current_model,
        messages=messages_for_llm,
        stream=True
    )

    assistant_message = ""

    for chunk in completion:
        delta = chunk.choices[0].delta.content or ""
        print(delta, end="", flush=True)
        assistant_message += delta

    print("\n")

    # Store assistant response
    conversation.append({"role": "assistant", "content": assistant_message})

print("\nASSISTANT: Thanks for chatting!\n\nConversation log:\n")

for msg in conversation:
    speaker = "You" if msg["role"] == "user" else "Assistant"
    print(f"{speaker}: {msg['content']}")
