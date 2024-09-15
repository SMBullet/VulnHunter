from ssh_helper import execute_command_on_kali

def run_nessus(ip):
    command = f"nessus -q -i {ip}"  # Replace with the Nessus command of your choice
    output, error = execute_command_on_kali(command)
    
    if output:
        print(f"Nessus Output:\n{output}")
    if error:
        print(f"Nessus Error:\n{error}")
