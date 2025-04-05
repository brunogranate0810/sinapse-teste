
import React from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Database, Globe, Link, Plus, WandSparkles } from 'lucide-react';

const IntegrationsPage = () => {
  return (
    <AppLayout title="Integrations">
      <Tabs defaultValue="api" className="space-y-6">
        <TabsList>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="connectors">Third-Party Connectors</TabsTrigger>
        </TabsList>
        
        <TabsContent value="api">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Your API Keys</h2>
              <Button>
                <Plus size={16} className="mr-1" />
                Create New API Key
              </Button>
            </div>
            
            <div className="border rounded-md p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium">Production API Key</h3>
                <p className="text-sm text-muted-foreground">Created on Aug 10, 2023</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Show Key</Button>
                <Button variant="destructive">Revoke</Button>
              </div>
            </div>
            
            <div className="border rounded-md p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium">Test API Key</h3>
                <p className="text-sm text-muted-foreground">Created on Jul 25, 2023</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Show Key</Button>
                <Button variant="destructive">Revoke</Button>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Code size={20} />
                  API Documentation
                </CardTitle>
                <CardDescription>
                  Use our API to programmatically manage your WhatsApp conversations and AI settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="border rounded-md p-3">
                  <h4 className="font-medium text-sm mb-1">Authentication</h4>
                  <p className="text-sm text-muted-foreground">
                    Use your API key in the Authorization header: <code>Authorization: Bearer YOUR_API_KEY</code>
                  </p>
                </div>
                <div className="border rounded-md p-3">
                  <h4 className="font-medium text-sm mb-1">Base URL</h4>
                  <p className="text-sm text-muted-foreground">
                    <code>https://api.whatsaiflow.com/v1</code>
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Full Documentation</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="webhooks">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Webhooks</h2>
              <Button>
                <Plus size={16} className="mr-1" />
                Create New Webhook
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link size={20} />
                  New Lead Webhook
                </CardTitle>
                <CardDescription>
                  This webhook is triggered when a new lead initiates a conversation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium block mb-1">URL</label>
                    <Input defaultValue="https://yourapp.com/webhooks/new-lead" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">Secret Key</label>
                    <Input type="password" defaultValue="••••••••••••••••••••••••" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="active" defaultChecked />
                    <label htmlFor="active" className="text-sm">Active</label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Test Webhook</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link size={20} />
                  Conversation Closed Webhook
                </CardTitle>
                <CardDescription>
                  This webhook is triggered when a conversation is marked as closed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium block mb-1">URL</label>
                    <Input defaultValue="https://yourcrm.com/api/conversation-closed" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">Secret Key</label>
                    <Input type="password" defaultValue="••••••••••••••••••••••••" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="active-closed" defaultChecked />
                    <label htmlFor="active-closed" className="text-sm">Active</label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Test Webhook</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="connectors">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="rounded-md p-2 bg-blue-100">
                    <Database size={20} className="text-blue-600" />
                  </div>
                  <CardTitle>Salesforce</CardTitle>
                </div>
                <CardDescription>
                  Connect your Salesforce CRM to sync contacts and conversations
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full">Connect</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="rounded-md p-2 bg-green-100">
                    <Database size={20} className="text-green-600" />
                  </div>
                  <CardTitle>HubSpot</CardTitle>
                </div>
                <CardDescription>
                  Sync contacts and conversations with your HubSpot account
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full">Connect</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="rounded-md p-2 bg-purple-100">
                    <Globe size={20} className="text-purple-600" />
                  </div>
                  <CardTitle>Zapier</CardTitle>
                </div>
                <CardDescription>
                  Connect to 3000+ apps with custom Zapier workflows
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full">Connect</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="rounded-md p-2 bg-yellow-100">
                    <WandSparkles size={20} className="text-yellow-600" />
                  </div>
                  <CardTitle>OpenAI</CardTitle>
                </div>
                <CardDescription>
                  Enhance your AI assistant with custom GPT models
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full">Connect</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}

export default IntegrationsPage;
