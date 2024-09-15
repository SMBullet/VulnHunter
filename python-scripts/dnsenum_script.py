from ssh_helper import execute_command_on_kali

def run_dnsenum(ip):
    command = f"dnsenum {ip}"  # Replace with the Dnsenum command of your choice
    output, error = execute_command_on_kali(command)
    
    if output:
        print(f"Dnsenum Output:\n{output}")
    if error:
        print(f"Dnsenum Error:\n{error}")
