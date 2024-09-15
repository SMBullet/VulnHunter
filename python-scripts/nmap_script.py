from ssh_helper import execute_command_on_kali

def run_nmap(ip):
    command = f"nmap -sV {ip}"  # Replace with the Nmap command of your choice
    output, error = execute_command_on_kali(command)
    
    if output:
        print(f"Nmap Output:\n{output}")
    if error:
        print(f"Nmap Error:\n{error}")
