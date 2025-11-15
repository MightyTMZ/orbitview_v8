from decouple import config
from pathlib import Path
import os

current_folder = os.getcwd()

print(current_folder)

co_pilot_prompt_path = config("ORBITVIEW_V8_PROFILE_CO_PILOT_SYSTEM_PROMPT")
profile_answering_prompt_path = config("ORBITVIEW_V8_PROFILE_PROFILE_ANSWERING_SYSTEM_PROMPT")

prompts = [
    co_pilot_prompt_path, 
    profile_answering_prompt_path
]

for prompt_path in prompts: 
    SYSTEM_PROMPT = Path(prompt_path).read_text().strip()
    print(SYSTEM_PROMPT)
    print("\n\n---------------------------------------------------------------------------\n\n")    
    