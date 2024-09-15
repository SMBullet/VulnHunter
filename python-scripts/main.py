import sys
from nmap_script import run_nmap
from nikto_script import run_nikto
from nessus_script import run_nessus
from dirb_script import run_dirb
from dnsenum_script import run_dnsenum
from openvas_script import run_openvas

def main():
    if len(sys.argv) != 3:
        print("Usage: main.py <tool> <target>")
        sys.exit(1)

    tool = sys.argv[1]
    target = sys.argv[2]

    # Map tool names to the corresponding functions
    tool_functions = {
        'nmap': run_nmap,
        'nikto': run_nikto,
        'nessus': run_nessus,
        'dirb': run_dirb,
        'dnsenum': run_dnsenum,
        'openvas': run_openvas
    }

    if tool not in tool_functions:
        print(f"Tool {tool} is not supported.")
        sys.exit(1)

    # Get the function for the specified tool
    tool_function = tool_functions[tool]
    
    try:
        output = tool_function(target)
        print(f"Output:\n{output}")
    except Exception as e:
        print(f"Error:\n{e}")

if __name__ == "__main__":
    main()
